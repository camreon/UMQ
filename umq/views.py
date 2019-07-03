import random
import subprocess
import youtube_dl

from flask import (
    abort, Blueprint, flash, json, jsonify, request, Response, render_template, stream_with_context
)
from umq.db import getAllTracks, getTrack, addTrack, deleteTrack, Track
from umq.log import log

bp = Blueprint("index", __name__)


@bp.route('/')
def index():
    '''Render tracklist.'''
    added = request.args.get('added', None)
    return render_template('index.html', added=added)


def ydl_stream(url):
    try:
        log.info('Started streaming %s' % url)

        proc = subprocess.Popen(['python', 'umq/ydl_stream.py', url],
                                stdout=subprocess.PIPE,
                                bufsize=0)
        for line in proc.stdout:
            yield line
    except IOError as e:
        log.error(str(e))
    else:
        log.info('Finished streaming')
        proc.kill()


@bp.route('/playlist/<id>')
def stream_track(id):
    '''Get track URL based on ID and use youtube-dl to stream it.'''
    track = getTrack(id)
    return Response(
        stream_with_context(ydl_stream(track.page_url)),
        mimetype='audio/mp4',
        headers={'Accept-Ranges': 'bytes'}
    )


@bp.route('/playlist/info/<id>')
def get_track_info(id):
    track = getTrack(id)
    return jsonify(track)


@bp.route('/playlist', methods=['GET'])
def get_all_tracks():
    tracks = getAllTracks()

    log.debug('%s track(s) found.' % len(tracks))

    if len(tracks) == 0:
        flash('Looks like you haven\'t added any tracks yet. Try this one:')
        flash(get_example())

    json_tracks = [t.to_json() for t in tracks]

    return json.dumps(json_tracks)


@bp.route('/playlist', methods=['POST'])
def add():
    '''Get track info from a URL and add it to the playlist.'''
    data = request.get_json()
    url = data['url']

    try:
        with youtube_dl.YoutubeDL() as ydl:
            info = ydl.extract_info(url, download=False)
    except Exception as e:
        # TODO handle unsupported URLs
        info = {'url': url, 'title': 'n/a'}  # offline dummy data
        abort(400)

    tracks = info['entries'] if 'entries' in info else [info]

    for t in tracks:
        new_track = Track(
            title=t['title'],
            artist=t.get('artist', ''),
            page_url=url,
            stream_url=t.get('url', url)
            # TODO 'duration'=t.get('duration') somehow ???
        )
        new_id = addTrack(new_track)
        log.info('ADDED: %s (%s)' % (t['title'], new_id))

    return jsonify(title=t['title'], url=url)


@bp.route('/playlist/<id>', methods=['DELETE'])
def delete(id=None):
    '''Delete a track by ID.'''
    track = getTrack(id)
    deleteTrack(track)
    log.info('DELETED: %s - %s' % (track.title, track.page_url))

    return json.dumps(track.to_json())


# TODO
# @umq.route('/<id>', methods=['PUT'])
# def update(id):
#     track = request.get_json()
#     umq.logger.debug(track)
#     res = g.playlist.update_one({'_id': track['id']}, track)
#     umq.logger.debug(res)
#     return res=


def get_example():
    return random.choice([
        'https://gloccamorradied.bandcamp.com/track/professional-confessional-2',
        'https://www.youtube.com/watch?v=CvCLhq8okxc',
        'https://soundcloud.com/serf-crook/homemovie02'
    ])

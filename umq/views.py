import random
import subprocess

from flask import (
    Blueprint, flash, jsonify, request, Response, render_template, stream_with_context
)
from umq.db import getAllTracks, getTrack, addTrack, deleteTrack, Track
from umq.log import log
from umq.stream_service import StreamService


bp = Blueprint("index", __name__)


@bp.route('/')
def index():
    """Render tracklist."""

    added = request.args.get('added', None)
    return render_template('index.html', added=added)


# TODO: move to StreamService
def ydl_stream(url):

    log.info('Started streaming %s' % url)

    proc = subprocess.Popen(['python', 'umq/ydl_stream.py', url],
                            stdout=subprocess.PIPE,
                            stderr=subprocess.PIPE,
                            bufsize=0)
    try:
        for line in proc.stdout:
            yield line
    except Exception as e:
        log.error('Streaming error: {}'.format(str(e)))
        proc.kill()
    else:
        log.info('Finished streaming %s' % url)
        proc.kill()


@bp.route('/playlist/<id>')
def stream_track(id):
    """Get track URL based on ID and use youtube-dl to stream it."""

    track = getTrack(id)

    try:
        return Response(
            # TODO: should use track.stream_url for playlists?
            stream_with_context(ydl_stream(track.page_url)),
            mimetype='audio/mp3',
            headers={'Accept-Ranges': 'bytes'}
        )
    except Exception as e:
        log.error('Response error: {}'.format(str(e)))


@bp.route('/playlist/info/<id>')
def get_track_info(id):

    track = getTrack(id)
    return jsonify(track.to_json())


@bp.route('/playlist', methods=['GET'])
def get_all_tracks():

    tracks = getAllTracks()

    log.debug('%s track(s) found.' % len(tracks))

    if len(tracks) == 0:
        flash('Looks like you haven\'t added any tracks yet. Try this one:')
        flash(get_example())

    json_tracks = [t.to_json() for t in tracks]

    return jsonify(json_tracks)


@bp.route('/playlist', methods=['POST'])
def add():
    """Get track info from a URL and add it to the playlist."""

    data = request.get_json()
    url = data['page_url']
    info = StreamService().extract_info(url)

    # TODO move to StreamService
    if info and 'entries' in info:
        tracks = info['entries']
    else:
        tracks = [info]

    added_tracks = []

    for t in tracks:
        title = t.get('title')

        if title is None or title == '_':
            title = t.get('alt_title')

        new_track = Track(
            title=title,
            artist=t.get('artist'),
            page_url=url,
            stream_url=t.get('url', url)
            # TODO 'duration'=t.get('duration')
            # TODO get duration somehow to allow scrubbing
        )

        new_id = addTrack(new_track)
        added_tracks.append(new_track)

        log.info('ADDED: %s (id: %s)' % (title, new_id))

    return jsonify([t.to_json() for t in added_tracks])


@bp.route('/playlist/<id>', methods=['DELETE'])
def delete(id=None):
    """Delete a track by ID."""

    track = getTrack(id)
    deleteTrack(track)

    log.info('DELETED: {0} - {1}'.format(track.title, track.page_url))
    flash('DELETED: {0} - {1}'.format(track.title, track.page_url))

    return jsonify(track.to_json())


# TODO
# @umq.route('/<id>', methods=['PUT'])
# def update(id):
#
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

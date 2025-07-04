**Universal Playlist** is a music streaming web app that can create a playlist from multiple sources (youtube, bandcamp, soundcloud, etc.)

**Demo:** http://www.bigplaylist.club/

#### Local Setup

```
$ docker-compose build
$ docker-compose up
```

Frontend runs at [http://localhost:3000](http://localhost:3000)

Backend at [http://localhost:80](http://localhost:80)


#### Deployment

- Uses https://fly.io/docs/
- Push to main branch
- OR run `fly deploy`


<details>

<summary>TODO</summary>

- [ ] more track loading states
  - instantly add track to playlist ui greyed out
  - state when song is loading
    - might not work for playlists... try `--lazy-playlist` cli option
- [ ] more error handling
- [ ] more frontend design
- [ ] analytics
  - https://plausible.io/#pricing
  - fly.io comes with sentry access maybe?
- [ ] scaling
  - is a queue system needed to handle high loads?
- [ ] playlists
  - titles
  - uuids
  - page to view all playlists you created
  - shuffle + repeat
- [ ] review yt-dlp configs that are used
- [ ] review logic for how streaming urls are stored and refreshed
- [ ] load testing
- [ ] fix yt streaming
  - example broken url: https://www.youtube.com/watch?v=Gr80_REfDZo
  - https://github.com/yt-dlp/yt-dlp/wiki/FAQ#how-do-i-pass-cookies-to-yt-dlp
  - send cookie from frontend
  - only if it's a youtube url
  - test it out a lot to make sure accounts won't get banned

</details>

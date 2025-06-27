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
- Push to deploy


#### Todo

- fix deployment
- more track loading states 
- more error handling
- more frontend design
- analytics
  - https://plausible.io/#pricing
- scaling
  - is a queue system needed to handle high loads?
- playlists
  - titles
  - uuids
  - view playlists you created
  - shuffle + repeat
- export to csv?
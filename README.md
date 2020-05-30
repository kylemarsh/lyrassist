# Lyrassist
:musical_score: Lyrics at your fingertips

Simple site to make it quick and easy to find song lyrics without much typing.
https://kylemarsh.github.io/lyrassist/

## To Deploy

1. Fork the repository
2. Clone it locally
3. Edit the "homepage" property in `package.json` to point to your pages
4. run `npm run predeploy` and `npm run deploy`

## To Add Songs / Playlists

After the steps described above: add songs/playlists in `data/songs.json`.
Commit, push, and deploy.

Future work may include pulling `songs.json` from a URL instead of a local file,
and allowing you to specify a URL to use at runtime.

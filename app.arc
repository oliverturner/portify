@app
portify

@create
autocreate true

@static

@http
get /
get /login
get /auth
post /logout

# Content routes (see @views below)
get /playlists
get /playlists/:playlistId
get /albums/:albumId
get /artists/:artistId

# API endpoints
get /api/top
get /api/playlists
get /api/playlists/:playlistId
get /api/albums/:albumId
get /api/artists/:artistId

@views
get /
get /playlists
get /playlists/:playlistId
get /albums/:albumId
get /artists/:artistId

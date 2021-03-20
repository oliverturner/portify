@app
portify

@create
autocreate true

@http
get /
get /login
get /auth
post /logout

get /api/top
get /api/playlists
get /api/playlists/:playlistId
get /api/albums/:albumId
get /api/artists/:artistId
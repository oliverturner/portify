@app
portify

@http
get /
get /login
get /auth
post /logout

# Content routes (see @views below)
get /playlists/:playlistId
get /albums/:albumId
get /artists/:artistId

# API endpoints
get /api/top
get /api/playlists
get /api/playlists/:playlistId
get /api/albums/:albumId
get /api/artists/:artistId

# These routes will have dependencies from /src/views copied to 
# their node_modules
@views
get /
get /playlists/:playlistId
get /albums/:albumId
get /artists/:artistId

get /api/top
get /api/playlists
get /api/playlists/:playlistId
get /api/albums/:albumId
get /api/artists/:artistId

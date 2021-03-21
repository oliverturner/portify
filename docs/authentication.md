# Authentication

Sessions are initialised in-browser using Spotify's OAuth flow. 

Requests to Portify's endpoints are routed through the middleware at `src/shared/handle-request.js`, which checks the session details exposed on the Request object.

If a request to Spotify is met with a 401 ("unauthorised") status code the cuaght error will trigger an attempt to use the `refresh_token` (issued at the beginning of the session) to generate a new, valid `access_token`.

The refresh attempt is capped at a single use: another failure and the session will be terminated and the user redirected to the login screen
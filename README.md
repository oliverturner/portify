# Portify v2.0

## What is this?
[Portify v1.0](https://www.portify.rocks) is an app that adds links to your Spotify playlists to help you buy the music you love. 

Portify v2.0 is a pure JS rewrite of the app's back end. The reasons for its migration can be read about in [why I rewrote a TypeScript app in pure JS](docs/background.md)

The front end is currently minimal: it will be (lavishly) redeveloped in Svelte Kit as soon as it's officially released 😀

In the meantime please dig into the code and feel free to raise issues and [ask questions](https://twitter.com/oliverturner)!

---

## Development

To build and run locally

### First: installation
1. `git clone git@github.com:oliverturner/portify.git`
1. `cd ./portify`
1. `npm install`

### Then: get your credentials
1. Rename `demo.env` to `.env`
1. Log in to [Spotify's developer portal](https://developer.spotify.com/dashboard/login)
1. Create a new application and make a note of the resulting `Client ID` and `Client Secret` values.
1. In your renamed `.env` file replace the dummy `xxx...xxx` values for `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` with the values you copied in the previous step

### Next: bootstrap the app
1. Run `npm start` to bootstrap the application (check out [the architecture explainer](docs/architecture.md) if you're interested in what happens in this step)
1. Open http://localhost:3333 and click "log in" to authenticate with Spotify
1. Use the resulting links to see the JSON output from the API endpoints

### Finally...
If you've completed the steps above...
1. Run `npm run coverage` to get an idea of what's under test
1. Run `npm run test:types` to trigger type checking on `./src` - no output means everything's working!

## Recommendations
If using VSCode these settings enable deeper TS integration 
1. Open preferences (`cmd + ,`)
1. Search for `implicitProjectConfig` and enable "Check JS", "Strict Function Types" and "Strict Null Checks"
1. Search for `implementationsCodeLens` and enable it

Installing [the suggested plugins](`.vscode/extensions.json`) is also helpful 

---

## Coming soon...
- A login button and some links to sample endpoints
- An explanation of some of the conventions around typing pure JS

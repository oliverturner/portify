# Portify

## What is this?
[Portify](https://www.portify.rocks) is an app that adds links to your Spotify playlists to help you buy the music you love.

This repo is a pure JS rewrite of the app's back-end. Details of its migration from TypeScript can be read [here](docs/background.md).

The front end will be redeveloped in Svelte Kit as soon as it's officially released 😀

---

## Development

To build and run locally, first

1. `git clone git@github.com:oliverturner/portify.git`
1. `cd ./portify`
1. `npm install`

Then
1. Rename `demo.env` to `.env`
1. Log in to [Spotify's developer portal](https://developer.spotify.com/dashboard/login)
1. Create a new application and copy the resulting `Client ID` and `Client Secret` values.
1. In your renamed `.env` file replace the dummy `xxx...xxx` values for `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` with the values you copied in the previous step

Next
1. Run `npm start`: this step will bootstrap the Lambdas

Finally...
1. Run `npm run coverage` to get an idea of what's under test
1. Run `npm run test:types` to trigger type checking on `./src` - no output means everything's working!

---

## Coming soon...
- A login button and some links to sample endpoints 😬
- An explanation of some of the conventions around typing JS

In the meantime please dig into the code and take a look!

(While Svelte Kit is in its infancy the UI will remain non-existent)

[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=for-the-badge&logo=github)](https://wallabyjs.com/oss/)
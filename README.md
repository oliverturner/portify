[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=for-the-badge&logo=github)](https://wallabyjs.com/oss/)

# Portify

https://www.portify.rocks

![lgagerxflc execute-api us-west-2 amazonaws com_playlist_37i9dQZEVXbpfc3fG6dt9B(iPad)](https://user-images.githubusercontent.com/21795/105782072-ac318d00-5f6b-11eb-81c3-0b50ebef0d7f.png)

## What is this repo?
### Short version
Like music? Like supporting the artists who make it? If you said "hell yeah", then this app is for you!

This is the ground-up rewrite of the back-end for the app originally released at [portify.rocks](https://www.portify.rocks)

### Longer version
Portify adds links to songs that you've _streamed_ to places you can _buy_ those tracks.

Logging in with Spotify lets the app display your playlists with additional buttons that search for that track on music marketplaces. 

Right now that means Beatport and Bandcamp (because those are the services I use) but please feel free to [make a suggestion](https://github.com/oliverturner/portify/issues): the more we can help musicians get paid the better

### Why the rewrite?
The first version was built to explore two technologies I wanted to learn: [Svelte](https://svelte.dev) and [Architect](https://arc.codes/docs/en/guides/get-started/quickstart); having learned, I wanted to take another run at the project without the burden of past mistakes. Ground-up rewrites aren't usually a practical (or desirable) option in professional development, so I'm relishing the opportunity a personal project gives me to build on simpler foundations.

### More type safety, less overhead
Another reason to revisit the code: to demonstrate how a pure JS application can use JSDoc to enjoy the benefits of TypeScript - hinting, autocompletion, checking, etc - without needing a compiler and avoiding the hidden cost of the additional config and plugins required to support non-application code: bundlers, linters, testing frameworks, etc. 

It's been liberating.

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

<!-- 
To see the application working
1. Run `npm run coverage` to get an idea of what's tested
1. Run `npm start` and visit `http://localhost:3333/api/top`  
-->
Next
1. Run `npm run coverage` to get an idea of what's under test
1. Run `npm run test:types` to trigger type checking on `./src` - no output means everything's working!

---

## Coming soon...
- A login button and some links to sample endpoints 😬
- An explanation of some of the conventions around typing JS

In the meantime please dig into the code and take a look!

(While Svelte Kit is in its infancy the UI will remain non-existent)
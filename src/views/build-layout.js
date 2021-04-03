const options = require("../shared/options");

/**
 * @param {{
 *   title?:string;
 *   appData: PortifyApi.AppDataGeneric;
 * }} params
 */
function buildLayout({ title, appData }) {
	return /* html */ `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title && title + " - "}Portify</title>
    <link rel="stylesheet" href="/_static/styles.css">
    <link rel="stylesheet" href="/_static/build/props.css">
    <link rel="stylesheet" href="/_static/build/bundle.css">

    <link rel="icon" href="/_static/assets/icons/portify.svg" type="image/svg+xml">
    <link rel="icon" href="/_static/assets/icons/favicon.ico">
    <link rel="apple-touch-icon" href="/_static/assets/icons/portify-180.png">
    <link rel="manifest" href="/_static/manifest.webmanifest">

  </head>
  <body>
    <div id="app">
      <div id="app__loader">loading...</div>
    </div>

    <script type="application/json" id="app-data">
      ${JSON.stringify({ options, ...appData })}
    </script>

    <script src="/_static/build/bundle.js" async defer></script>
  </body>
  </html>
  `;
}

module.exports = {
	buildLayout,
};

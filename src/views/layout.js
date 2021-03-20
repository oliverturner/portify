/**
 * @param {string} content
 */
function getLayout(content) {
	return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Portify</title>
    <link rel="stylesheet" href="/_static/styles.css">
  </head>
  <body class="padding-32">
    ${content}
  </body>
  </html>
  `;
}

module.exports = {
	getLayout,
};

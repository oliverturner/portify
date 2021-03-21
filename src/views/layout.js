/**
 * @param {{
 *   nav:boolean;
 *   title?:string;
 *   content:string;
 * }} params
 */
function getLayout({ title, nav, content }) {
  const navHtml = nav ? `<form action="/logout" method="post"><button>logout</button></p>` : ""

	return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Portify${title && ": " + title}</title>
    <link rel="stylesheet" href="/_static/styles.css">
  </head>
  <body class="padding-32">
    <header>
      <h1>Portify</h1>
      <nav class="flex flex--sb">${navHtml}</nav>
    </header>
    ${content}
  </body>
  </html>
  `;
}

module.exports = {
	getLayout,
};

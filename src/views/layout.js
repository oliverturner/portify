/**
 * @param {{
 *   nav:boolean;
 *   title?:string;
 *   content:string;
 *   data: string;
 * }} params
 */
function getLayout({ title, nav, content, data }) {
	const navHtml = nav
		? `<form action="/logout" method="post"><button>logout</button></p>`
		: "";

	return /* html */ `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Portify${title && ": " + title}</title>
    <link rel="stylesheet" href="/_static/styles.css">
    <link rel="stylesheet" href="/_static/build/bundle.css">
  </head>
  <body class="padding-32">
    <header>
      <h1>Portify</h1>
      <nav class="flex flex--sb">
        ${navHtml}
      </nav>
    </header>
    
    <main>
      ${content}
    </main>
    
    <script type="application/json">
      ${data}
    </script>
    <script src="/_static/build/bundle.js"></script>
  </body>
  </html>
  `;
}

module.exports = {
	getLayout,
};

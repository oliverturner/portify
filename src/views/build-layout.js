/**
 * @param {{
 *   title?:string;
 *   content?:string;
 *   routeData: PortifyApi.RouteData<any>;
 * }} params
 */
function buildLayout({ title, content, routeData }) {
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
  <body>
    <div id="app">
      <header>
        <h1>Portify</h1>
        <nav class="flex flex--sb">
          <form action="/logout" method="post"><button>logout</button></p>
        </nav>
      </header>
      
      <main>
        ${content ? content : ""}
      </main>
    </div>

    <script type="application/json" id="data">
      ${JSON.stringify({ ...routeData })}
    </script>

    <script src="/_static/build/bundle.js" async defer></script>
  </body>
  </html>
  `;
}

module.exports = {
	buildLayout,
};

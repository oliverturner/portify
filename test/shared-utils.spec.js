const test = require("tape");
const sandbox = require("@architect/sandbox");
const { buildUrl } = require("../src/shared/utils");

/**
 * Sandbox / http test
 * - Demonstrates execising basic web integration tests using the local dev server
 */
test("Set up env", (t) => {
  t.plan(1);
  t.ok(sandbox, "sandbox loaded");
});

test("Build request", async (t) => {
  const urls = [
    {
      desc: "Specifying base forms URL and path",
      input: { base: "http://alt.portify.test", path: "/test-path" },
      expected: "http://alt.portify.test/test-path",
    },
    {
      desc: "Omitting base defaults URL and adds version prefix",
      input: { path: "/test-path-1" },
      expected: "https://local.portify.test/v0/test-path-1",
    },
    {
      desc: "Params are appended",
      input: { path: "/test-path-2", params: { a: 1, b: 2 } },
      expected: "https://local.portify.test/v0/test-path-2?a=1&b=2",
    },
  ];

  t.plan(urls.length);
  for (const { desc, input, expected } of urls) {
    t.equals(buildUrl(input), expected, desc);
  }
});

test("Shut down sandbox", async (t) => {
  console.log(process.env);
  
  t.plan(1);
  let result = await sandbox.end();
  t.equal(result, "Sandbox successfully shut down");
});

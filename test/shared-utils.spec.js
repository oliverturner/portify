const test = require("tape");
const sandbox = require("@architect/sandbox");
const { buildUrl, filterProps } = require("../src/shared/utils");

/**
 * Sandbox / http test
 * - Demonstrates execising basic web integration tests using the local dev server
 */
test("Set up env", async (t) => {
  t.plan(1);
  await sandbox.start();
  t.ok(true, "started");
});

test("Build request", async (t) => {
  const base = "https://local.portify.test";
  const prefix = "v0";
  
  const urls = [
    {
      desc: "Specifying base forms URL and path",
      input: { base: "http://alt.portify.test", path: "/test-path" },
      expected: "http://alt.portify.test/test-path",
    },
    {
      desc: "Omitting base defaults URL and adds version prefix",
      input: { base, prefix, path: "/test-path-1" },
      expected: "https://local.portify.test/v0/test-path-1",
    },
    {
      desc: "Params are appended",
      input: { base, prefix, path: "/test-path-2", params: { a: 1, b: 2 } },
      expected: "https://local.portify.test/v0/test-path-2?a=1&b=2",
    },
  ];

  t.plan(urls.length);
  for (const { desc, input, expected } of urls) {
    t.equals(buildUrl(input), expected, desc);
  }
});

test("filterProps", (t) => {
  const target = { a: 1, b: 2, "c-0": undefined };
  const scenarios = [
    {
      desc: "All props allowed",
      filters: ["a", "b", "c-0"],
      expected: target,
    },
    {
      desc: "Undefined filters are ignored",
      expected: target,
    },
  ];

  t.plan(scenarios.length);
  for (const { desc, filters, expected } of scenarios) {
    const input = filterProps(target, filters);
    t.deepEqual(input, expected, desc);
  }
});

test("Shut down sandbox", async (t) => {
  t.plan(1);
  let result = await sandbox.end();
  t.equal(result, "Sandbox successfully shut down");
});

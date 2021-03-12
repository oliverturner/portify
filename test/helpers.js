const test = require("tape");
const sandbox = require("@architect/sandbox");

/**
 * Spin up & shut down sandbox
 *
 * @param {string} label
 * @returns
 */
function getTestEnv(label) {
  return {
    up: function () {
      test(`▲ ${label}: Set up env`, async (t) => {
        t.plan(1);
        await sandbox.start();
        t.ok(true, "started");
      });
    },

    down: function () {
      test(`▼ ${label}: Shut down env`, async (t) => {
        t.plan(1);
        let result = await sandbox.end();
        t.equal(result, "Sandbox successfully shut down");
      });
    },
  };
}

module.exports = {
  getTestEnv,
};

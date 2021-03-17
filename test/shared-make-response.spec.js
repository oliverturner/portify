// @ts-nocheck
const test = require("tape");
const nock = require("nock");

const { makeResponse } = require("../src/shared/make-response");
const { getTestEnv } = require("./helpers");
const fixtures = require("./fixtures/spotify.json");

const testTitle = "shared/makeResponse"
const testEnv = getTestEnv(testTitle);

const successResponse = { value: "hello" };

const logoutResponse = {
	session: {},
	location: "/",
};

nock(fixtures.loginUrl)
	.post("/api/token")
	.reply((_, req) => {
		const params = new URLSearchParams(req);

		return params.get("refresh_token") === "f4k3-r3fr35h-t0k3n"
			? [200, { access_token: "f4k3-4cc355-t0k3n" }]
			: [401];
	});

const handleReq = async (req) => {
	if (!req.session) return Promise.reject({ statusCode: 400 });

	return req.session.access_token === "f4k3-4cc355-t0k3n"
		? successResponse
		: Promise.reject({ statusCode: 401 });
};

testEnv.up();

test(testTitle, async (t) => {
	const scenarios = [
		{
			desc: "executes normally",
			request: { session: { access_token: "f4k3-4cc355-t0k3n" } },
			expected: { json: successResponse },
		},
		{
			desc: "handles errors with no session",
			request: { value: "hello" },
			expected: logoutResponse,
		},
		{
			desc: "retries successfully",
			request: {
				session: {
					access_token: "expired",
					refresh_token: "f4k3-r3fr35h-t0k3n",
				},
			},
			expected: successResponse,
		},
		{
			desc: "permanently rejects unsuccessful retries",
			request: {
				session: { access_token: "expired", refresh_token: "reject-me" },
			},
			expected: logoutResponse,
		},
	];

	t.plan(scenarios.length);
	for (const { request, expected, desc } of scenarios) {
		const response = await makeResponse(handleReq)(request);
		t.deepEqual(response, expected, desc);
	}
});

testEnv.down();

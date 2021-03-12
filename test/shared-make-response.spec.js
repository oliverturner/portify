// @ts-nocheck
const test = require("tape");
const nock = require("nock");

const { makeResponse } = require("../src/shared/make-response");
const { getTestEnv } = require("./helpers");
const fixtures = require("./fixtures/spotify.json");

const testEnv = getTestEnv("makeResponse");

testEnv.up();

const logoutResponse = {
	session: {},
	location: "/",
};

test("makeResponse executes handleReq", async (t) => {
	const handleReq = async ({ value }) => value;
	const request = { value: "hello" };
	const response = await makeResponse(handleReq)(request);

	const expected = "hello";

	t.plan(1);
	t.equal(response, expected);
});

test("makeResponse handles errors with no session", async (t) => {
	const handleReq = async () => Promise.reject({ statusCode: 400 });
	const request = { value: "hello" };
	const response = await makeResponse(handleReq)(request);

	t.plan(1);
	t.deepEqual(response, logoutResponse);
});

test("makeResponse handles successful retries", async (t) => {
	nock(fixtures.loginUrl)
		.post("/api/token")
		.reply(200, { access_token: "f4k3-4cc355-t0k3n" });

	const handleReq = async (req) => {
		return req.session.access_token === "f4k3-4cc355-t0k3n"
			? { value: "hello" }
			: Promise.reject({ statusCode: 401 });
	};

	const request = { session: { access_token: "expired" } };
	const expected = { value: "hello" };
	const response = await makeResponse(handleReq)(request);

	t.plan(1);
	t.deepEqual(response, expected);
});

test("makeResponse permanently rejects unsuccessful retries", async (t) => {
	nock(fixtures.loginUrl).post("/api/token").reply(401);

	const handleReq = async (req) => {
		return req.session.access_token === "f4k3-4cc355-t0k3n"
			? { value: "hello" }
			: Promise.reject({ statusCode: 401 });
	};

	const request = { session: { access_token: "expired" } };
	const response = await makeResponse(handleReq)(request);

	t.plan(1);
	t.deepEqual(response, logoutResponse);
});

testEnv.down();

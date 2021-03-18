const test = require("tape");

const {
	buildUrl,
	getApiUrl,
	requestFactory,
	filterProps,
	buildDict,
	getPrevNext,
} = require("../src/shared/utils");
const { apiUrl } = require("./fixtures/spotify.json");

test("shared/utils.buildUrl", (t) => {
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

test("shared/utils.getApiUrl", (t) => {
	const url = getApiUrl(process.env, "/me/top/tracks", { a: 1, b: 2 });
	const expected = "https://api.spotify.com/v1/me/top/tracks?a=1&b=2";
	const desc = "getApiUrl matches";

	t.plan(1);
	t.equals(url, expected, desc);
});

test("shared/utils.requestFactory", (t) => {
	const access_token = "f4k3-4cc355-t0k3n";
	const session = { access_token };
	const getRequest = requestFactory(process.env, session);
	const inputs = [
		getRequest("/one/two", { a: 1, b: 2 }),
		getRequest("/three/four", { a: 3, b: 4 }),
	];
	const expected = [
		{
			url: "https://api.spotify.com/v1/one/two?a=1&b=2",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		},
		{
			url: "https://api.spotify.com/v1/three/four?a=3&b=4",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		},
	];

	t.plan(1);
	t.deepEquals(inputs, expected, "url configs are successfully generated");
});

test("shared/utils.filterProps", (t) => {
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
		{
			desc: "Some props allowed",
			filters: ["a", "b"],
			expected: { a: 1, b: 2 },
		},
		{
			desc: "Missing props ignored",
			filters: ["d", "e"],
			expected: {},
		},
	];

	t.plan(scenarios.length);
	for (const { desc, filters, expected } of scenarios) {
		const actual = filterProps(target, filters);
		t.deepEqual(actual, expected, desc);
	}
});

test("shared/utils.buildDict", (t) => {
	const multiplyByThree = ({ value }) => value * 3;

	const items = [
		{ id: "a", value: 5 },
		{ id: "b", value: 100 },
		{ id: "c", value: "bad" },
	];

	const expected = {
		a: 15,
		b: 300,
		c: NaN,
	};

	const actual = buildDict(items, multiplyByThree);

	t.plan(1);
	t.deepEquals(actual, expected, "buildDict creates a keyed object");
});

// TODO: fix this so that original parameters are preserved
test("shared/utils.getPrevNext", (t) => {
	const rawUrl = `${apiUrl}/five/six?a=5&b=6&limit=100&offset=10`;
	const actual = getPrevNext(apiUrl)(rawUrl);
	const expected = "https://api.spotify.com/v1?offset=10&limit=100";

	t.plan(1);
	t.equals(actual, expected, "Extracts and appends limit & offset");
});

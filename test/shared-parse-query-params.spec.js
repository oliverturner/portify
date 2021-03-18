const test = require("tape");
const {
	constants,
	getPagingParams,
	getTimeRange,
} = require("../src/shared/parse-query-params");

test("shared/parse-query-params", (t) => {
	const scenarios = [
		{
			actual: getPagingParams(),
			expected: { limit: constants.PAGE_LIMIT_DEFAULT, offset: 0 },
			desc: "getPagingParams handles no input",
		},
		{
			actual: getPagingParams({ limit: "1000" }),
			expected: { limit: constants.PAGE_LIMIT_MAX, offset: 0 },
			desc: "getPagingParams handles excessive limit",
		},
		{
			actual: getPagingParams({ limit: "-1" }),
			expected: { limit: 0, offset: 0 },
			desc: "getPagingParams handles negative limit",
		},
		{
			actual: getPagingParams({ limit: "non_existent" }),
			expected: { limit: constants.PAGE_LIMIT_DEFAULT, offset: 0 },
			desc: "getPagingParams handles bad input",
		},
		{
			actual: getTimeRange({ time_range: "non_existent" }),
			expected: constants.TIME_RANGE_DEFAULT,
			desc: "getTimeRange handles bad input",
		},
		{
			actual: getTimeRange({ time_range: "short_term" }),
			expected: "short_term",
			desc: "getTimeRange handles normal input",
		},
	];

	t.plan(scenarios.length);
	for (const { actual, expected, desc } of scenarios) {
		t.deepEquals(actual, expected, desc);
	}
});

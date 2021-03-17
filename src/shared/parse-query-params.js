const constants = {
	TIME_RANGES: ["short_term", "medium_term", "long_term"],
	TIME_RANGE_DEFAULT: "medium_term",
	PAGE_LIMIT_DEFAULT: 48,
	PAGE_LIMIT_MAX: 100,
};

/**
 * @param {Record<string, string>} queryStringParameters
 */
function getTimeRange({ time_range }) {
	return constants.TIME_RANGES.includes(time_range)
		? time_range
		: constants.TIME_RANGE_DEFAULT;
}

/**
 * @param {Record<string, string>} queryStringParameters
 */
function getLimit({ limit }) {
	const n = parseInt(limit, 10);
	const x = isNaN(n) ? constants.PAGE_LIMIT_DEFAULT : n;

	let num;
	num = x > constants.PAGE_LIMIT_MAX ? constants.PAGE_LIMIT_MAX : x;
	num = x < 0 ? 0 : num;

	return num;
}

/**
 * @param {Record<string, string>} queryStringParameters
 */
function getOffset({ offset }) {
	const n = parseInt(offset, 10);
	const x = isNaN(n) ? 0 : n;
	return x;
}

/**
 * @param {Record<string, string>} queryStringParameters
 */
function getPagingParams(queryStringParameters = {}) {
	return {
		limit: getLimit(queryStringParameters),
		offset: getOffset(queryStringParameters),
	};
}

module.exports = {
	constants,
	getTimeRange,
	getLimit,
	getOffset,
	getPagingParams,
};

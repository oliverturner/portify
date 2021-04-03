const options = require("./options");

/**
 * @param {Record<string, string>} queryStringParameters
 */
function getTimeRange({ time_range }) {
	// @ts-ignore
	return options.TIME_RANGES.includes(time_range)
		? time_range
		: options.TIME_RANGE_DEFAULT;
}

/**
 * @param {Record<string, string>} queryStringParameters
 */
function getLimit({ limit }) {
	const n = parseInt(limit, 10);
	const x = isNaN(n) ? options.PAGE_LIMIT_DEFAULT : n;

	let num;
	num = x > options.PAGE_LIMIT_MAX ? options.PAGE_LIMIT_MAX : x;
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
	getTimeRange,
	getLimit,
	getOffset,
	getPagingParams,
};

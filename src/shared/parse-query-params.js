/** @type {Portify.TimeRange} */
const parseQuery = "short_term";
const PAGE_LIMIT = 48;

/**
 * @param {Record<string, string>} queryStringParameters
 * @param {Portify.TimeRange} [defaultRange]
 */
function getTimeRange({ time_range }, defaultRange) {
	const ranges = ["short_term", "medium_term", "long_term"];
	return ranges.includes(time_range) ? time_range : defaultRange || parseQuery;
}

/**
 * @param {Portify.Dict} queryStringParameters
 * @param {number} [defaultLimit]
 */
function getLimit({ limit }, defaultLimit) {
	return Number(limit) || defaultLimit || PAGE_LIMIT;
}

/**
 * @param {Portify.Dict} queryStringParameters
 */
function getOffset({ offset }) {
	return offset ? Number(offset) : 0;
}

/**
 * @param {Portify.Dict} queryStringParameters
 */
 function getPagingParams(queryStringParameters) {
	return {
		limit: getLimit(queryStringParameters),
		offset: getOffset(queryStringParameters),
	};
}

module.exports = {
	getTimeRange,
	getLimit,
	getOffset,
	getPagingParams
};

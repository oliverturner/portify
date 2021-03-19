module.exports = function () {
	return {
		files: ["src/**/*.js"],
		tests: ["test/**/*.spec.js"],
		env: {
			type: "node",
		},
		testFramework: "tape"
	};
};

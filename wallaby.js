module.exports = () => ({
	files: ["src/http/**/*.js", "test/**/*.js"],
	tests: ["test/*.spec.js"],
	env: {
		type: "node",
	},
	testFramework: "tape",
});

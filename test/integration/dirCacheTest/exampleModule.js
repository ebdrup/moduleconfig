"use strict";
var moduleConfig = require("../../../lib/moduleConfig");
module.exports = function () {
	return moduleConfig(["config.js", "config/config.js"], function (configFilePath) {
		return require(configFilePath);
	});
};
"use strict";
var moduleConfig = require("../../../lib/moduleConfig");
module.exports = function () {
	return moduleConfig(["configOther.js", "config/configOther.js"], function (configFilePath) {
		return require(configFilePath);
	});
};
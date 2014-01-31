"use strict";
var path = require("path");
var fs = require("fs");
var existsSync = fs.existsSync || path.existsSync;

module.exports = function getErrorConfigFilePath(startDir, paths) {
	var dir = startDir;
	var lastDir;
	while (lastDir !== dir) {
		for (var i = 0; i < paths.length; i++) {
			if (existsSync(path.join(dir, paths[i]))) {
				return path.join(dir, paths[i]);
			}
		}
		lastDir = dir;
		dir = path.join(dir, "..");
	}
	return false;
};
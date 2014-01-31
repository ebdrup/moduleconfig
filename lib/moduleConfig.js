"use strict";
delete require.cache[__filename]; //do not cache in require cache
delete require.cache[module.parent.filename]; //do not cache in require cache
var cache = require("./cache"); //use requires caching to have a singleton
var getConfigPath = require("./getConfigPath"); //use requires caching to have a singleton
var path = require("path");

module.exports = function moduleConfig(paths, loadPathFunction) {
	var startDir = path.dirname(module.parent.parent.filename);
	var configPath;
	var pathsId = paths.join(",");

	// add the paths to the paths cache
	var found = false;
	var pathsIndex = cache.paths.length;  // set the index to the next available location
	for (var p = 0; p < cache.paths.length; p++) {
		// check to see if this paths was already cached
		if (pathsId === cache.paths[p]) {
			// this was already cached, so use its already cached data
			pathsIndex = p;
			found = true;
			break;
		}
	}
	if (!found) {
		cache.paths[pathsIndex] = pathsId;
	}

	if (cache.configPaths[pathsIndex] && cache.configPaths[pathsIndex][startDir]) {
		configPath = cache.configPaths[pathsIndex][startDir];
	} else {
		configPath = getConfigPath(startDir, paths);
		if (!configPath) {
			throw new Error("moduleconfig, cannot find [" + paths.join(",") + "] starting from path " + startDir);
		}
		if (typeof cache.configPaths[pathsIndex] === "undefined") {
			cache.configPaths[pathsIndex] = {};
		}
		cache.configPaths[pathsIndex][startDir] = configPath;
	}

	if (!cache.modules[pathsIndex] || !cache.modules[pathsIndex][startDir]) {
		if (typeof cache.modules[pathsIndex] === "undefined") {
			cache.modules[pathsIndex] = {};
		}
		cache.modules[pathsIndex][startDir] = loadPathFunction(configPath);
	}
	return cache.modules[pathsIndex][startDir];
};
"use strict";
delete require.cache[__filename]; //do not cache in require cache
delete require.cache[module.parent.filename]; //do not cache in require cache
var cache = require("./cache"); //use requires caching to have a singleton
var getConfigPath = require("./getConfigPath"); //use requires caching to have a singleton
var path = require("path");

module.exports = function moduleConfig(paths, loadPathFunction){
	var startDir = path.dirname(module.parent.parent.filename);
	var configPath;
	if (cache.configPaths[startDir]) {
		configPath = cache.configPaths[startDir];
	} else {
		configPath = getConfigPath(startDir, paths);
		if(!configPath){
			throw new Error("moduleconfig, cannot find [" + paths.join(",") +  "] starting from path " + startDir);
		}
		cache.configPaths[startDir] = configPath;
	}
	if (!(configPath in cache.modules)) {
		cache.modules[configPath] = loadPathFunction(configPath);
	}
	return cache.modules[configPath];
};
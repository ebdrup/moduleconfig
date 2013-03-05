moduleconfig
============

loading configuration files for node modules.

You are building a module `X` with a config file
------------------------------------------------

The module `X` has a configuration, by convention this configuration specified in in the file `X.config.js`.

In project `P` the module `X` is required.
In project `P` the module `M` is also required
Module also `M` requires `X`

This means that when the module `M` uses `X` the configuration should be loaded from `P/node_modules/M/X.config.js`,
and when the project `P` uses the module `X` the configuration should be loaded from `P/X.config.js`

Problem
-------
Because `P` and `M` both require the same version of `X`. `npm` only installs `X` in `P/node_modules/X`.
`X` is *not* installed in `P/node_modules/M/node_modules/X`. Therefore the `require`-ing `X` does not load the correct
config


Solution: Use `moduleconfig` in the module `X`
----------------------------------------------
X.js is the main file pointed to by the `package.json` in the `X` module
```js
module.exports = moduleConfig(["X.config.js"], function(configFilePath){
	return instantiateXfromConfig(require(configFilePath));
});
```

This will mean that this:
```
var x = require("X");
```

will return an `x` based on `P/node_modules/M/X.config.js` when `X` is required anywhere in the path `P/node_modules/M/...`

and it will return an `x` based on `P/X.config.js` when `X` is required by code in `P`.


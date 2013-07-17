moduleconfig
============

loading configuration files for node modules. 
If you are building a node module that needs a configuration file, you have come to the right place.

You are building a module `X` with a config file
------------------------------------------------

The module `MyModule` has a configuration, by convention this configuration specified in in the file `MyModule.config.js`.

In project `Main` the module `MyModule` is required.
In project `Main` the module `ExternalModule` is also required
Module also `ExternalModule` requires `MyModule`

This means that when the module `ExternalModule` uses `MyModule` the configuration should be loaded from `P/node_modules/ExternalModule/MyModule.config.js`,
and when the project `Main` uses the module `MyModule` the configuration should be loaded from `P/MyModule.config.js`

Problem
-------
Because `Main` and `ExternalModule` both require the same version of `MyModule`. 
`npm` only installs `MyModule` in `P/node_modules/MyModule`.
`MyModule` is *not* installed in `P/node_modules/M/node_modules/MyModule`. 

Therefore the `require`-ing `MyModule` from the code `ExternalModule` in does not load the correct
config. It loads the config from `P/MyModule.config.js` and *not* from `P/node_modules/ExternalModule/MyModule.config.js` as it should.
The `Main` projects config overrides the `ExternalModule` config.


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


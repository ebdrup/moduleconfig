"use strict";
describe("moduleConfig", function () {

	describe("having required exampleModule in test1 dir", function () {
		var exampleModule1;
		before(function () {
			exampleModule1 = require("./dirCacheTest/test1/requireExampleModule");
		});

		it("will have the test1 schema", function () {
			expect(exampleModule1).to.have.property("test1");
		});

		describe("requiring it again ()", function () {
			var exampleModule2;
			before(function () {
				//is not cached in require cache
				exampleModule2 = require("./dirCacheTest/test1/requireExampleModule");
			});

			it("will be the same instance", function () {
				expect(exampleModule2).to.equal(exampleModule1);
			});

		});
	});
	describe("having required schemagic in test2 dir", function () {
		var exampleModule1;
		before(function () {
			exampleModule1 = require("./dirCacheTest/test2/requireExampleModule");
		});

		it("will have the test2 schema", function () {
			expect(exampleModule1).to.have.property("test2");
		});

		describe("requiring it from subdir", function () {
			var exampleModule2;
			before(function () {
				exampleModule2 = require("./dirCacheTest/test2/test2subdir/requireExampleModule");
			});

			it("will be the same instance", function () {
				expect(exampleModule2).to.equal(exampleModule1);
			});

		});
	});
	describe("having required exampleModule in test1 dir", function () {
		var exampleModule1;
		before(function () {
			exampleModule1 = require("./dirCacheTest/test1/requireExampleModule");
		});

		it("will have the test1 schema", function () {
			expect(exampleModule1).to.have.property("test1");
		});

		describe("requiring exampleModuleOther in test3 dir", function () {
			var exampleModule3;
			before(function () {
				//is not cached in require cache
				exampleModule3 = require("./dirCacheTest/test3/requireExampleModule");
			});

			it("will be the different instance", function () {
				expect(exampleModule3).to.have.property("test3");
			});

		});
	});
	describe("having required exampleModule in test4 dir", function () {
		var exampleModule1;
		before(function () {
			exampleModule1 = require("./dirCacheTest/test4/requireExampleModule");
		});

		it("will have the test1 schema", function () {
			expect(exampleModule1).to.have.property("test1");
		});

		describe("requiring exampleModuleOther in test4 dir", function () {
			var exampleModule4;
			before(function () {
				//is not cached in require cache
				exampleModule4 = require("./dirCacheTest/test4/requireExampleModuleOther");
			});

			it("will be the different instance", function () {
				expect(exampleModule4).to.have.property("test4");
			});

		});
	});
});
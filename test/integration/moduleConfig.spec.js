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

		describe("requiring it again ()", function(){
			var exampleModule2;
			before(function(){
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

		describe("requiring it from subdir", function(){
			var exampleModule2;
			before(function(){
				exampleModule2 = require("./dirCacheTest/test2/test2subdir/requireExampleModule");
			});

			it("will be the same instance", function () {
				expect(exampleModule2).to.equal(exampleModule1);
			});

		});
	});
	
});
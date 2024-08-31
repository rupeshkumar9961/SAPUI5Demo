/*global QUnit*/

sap.ui.define([
	"comsapdemomanagecustomer/managecustomer/controller/Customers.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Customers Controller");

	QUnit.test("I should test the Customers controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});

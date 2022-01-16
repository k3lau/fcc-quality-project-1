const { AssertionError } = require("chai");
const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
    test("Input", function () {
        assert.equal(convertHandler.getNum("5"), 5, "whole number")
        assert.equal(convertHandler.getNum("1.2"), 1.2, "Decimal number")
        assert.equal(convertHandler.getNum("1/2"), 0.5, "Fraction number")
        assert.equal(convertHandler.getNum("1/2.5"), 0.4, "Fraction number with decimal")
        assert.equal(convertHandler.getNum(""), 1, "Empty number in string")
    });
});

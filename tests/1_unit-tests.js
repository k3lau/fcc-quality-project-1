const { AssertionError } = require("chai");
const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("Whole number", function () {
    assert.equal(convertHandler.getNum("5"), 5, "whole number");
  });
  test("Decimal number", function () {
    assert.equal(convertHandler.getNum("1.2"), 1.2, "Decimal number");
  });
  test("Fraction number", function () {
    assert.equal(convertHandler.getNum("1/2"), 0.5, "Fraction number");
  });
  test("Fraction number with decimal", function () {
    assert.equal(
      convertHandler.getNum("1/2.5"),
      0.4,
      "Fraction number with decimal"
    );
  });
  test("Error for double fraction", function () {
    assert.strictEqual(convertHandler.getNum("3/2/3"), "invalid number");
  });
  test("Empty number", function () {
    assert.equal(convertHandler.getNum(""), 1, "Empty number in string");
  });
  test("Valid unit", function () {
    let validUnit = ["l", "gal", "lbs", "kg", "mi", "km"];
    validUnit.forEach((unit) => {
      assert.notStrictEqual(convertHandler.getReturnUnit(unit), "invalid unit");
    });
  });
  test("Error for invalid input", function () {
    assert.equal(convertHandler.getUnit("min"), "invalid unit");
  });
  test("Correct return unit for valid input unit", function () {
    let validUnit = ["l", "gal", "lbs", "kg", "mi", "km"];
    let correctReturnUnit = ["gal", "L", "kg", "lbs", "km", "mi"];
    for (let index = 0; index < validUnit.length; index++) {
      assert.strictEqual(
        convertHandler.getReturnUnit(validUnit[index]),
        correctReturnUnit[index]
      );
    }
  });
  test("Correct return spelled out string for each valid unit", function () {
    let validUnit = ["l", "gal", "lbs", "kg", "mi", "km"];
    let correctSpellOut = [
      "liters",
      "gallons",
      "pounds",
      "kilograms",
      "miles",
      "kilometers",
    ];
    for (let index = 0; index < validUnit.length; index++) {
      assert.strictEqual(
        convertHandler.spellOutUnit(validUnit[index]),
        correctSpellOut[index]
      );
    }
  });
  test("Convert gal to L", function () {
    assert.strictEqual(convertHandler.getReturnUnit("gal"), "L");
  });
  test("Convert L to gal", function () {
    assert.strictEqual(convertHandler.getReturnUnit("L"), "gal");
  });
  test("Convert mi to km", function () {
    assert.strictEqual(convertHandler.getReturnUnit("mi"), "km");
  });
  test("Convert km to mi", function () {
    assert.strictEqual(convertHandler.getReturnUnit("km"), "mi");
  });
  test("Convert lbs to kg", function () {
    assert.strictEqual(convertHandler.getReturnUnit("lbs"), "kg");
  });
  test("Convert kg to lbs", function () {
    assert.strictEqual(convertHandler.getReturnUnit("kg"), "lbs");
  });
});

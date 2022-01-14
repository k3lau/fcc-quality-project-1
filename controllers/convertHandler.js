function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    let regex = /[+-]?\d+(\.\d+)?/g;
    result = input.match(regex)[0];
    return result;
  };

  this.getUnit = function (input) {
    let result;
    let regex = /[+-]?\d+(\.\d+)?/g;
    result = input.replace(regex, "");
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit) {
      case "gal":
        result = "L";
        break;
      case "lbs":
        result = "kg";
        break;
      case "mi":
        result = "km";
        break;
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    switch (unit) {
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      case "gal":
        result = "gallons";
        break;
      case "L":
        result = "liters";
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = {};
    switch (initUnit) {
      case "gal":
        result.num = roundNum(initNum * galToL);
        result.unit = "L";
        break;
      case "lbs":
        result.num = roundNum(initNum * lbsToKg);
        result.unit = "kg";
        break;
      case "mi":
        result.num = roundNum(initNum * miToKm);
        result.unit = "km";
        break;
    }
    return result;
  };

  function roundNum(num) {
    let n = 5;
    return parseFloat(
      Math.round(num * Math.pow(10, n)) / Math.pow(10, n)
    ).toFixed(n);
  }
  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;

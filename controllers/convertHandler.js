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
        result = "Kg";
        break;
      case "mi":
        result = "Km";
        break;
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

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
        result.unit = "Kg";
        break;
      case "mi":
        result.num = roundNum(initNum * miToKm);
        result.unit = "Km";
        break;
    }
    return result;
  };

  function roundN(num) {
    let n = 5;
    return parseFloat(
      Math.round(num * Math.pow(10, n)) / Math.pow(10, n)
    ).toFixed(n);
  }
  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    return result;
  };
}

module.exports = ConvertHandler;

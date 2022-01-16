function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    let regex = /[+-]?(\d+)?(\.\d+)?(\/[+-]?(\d+)?(\.\d+)?)?/g;
    result = input.match(regex);
    console.log(result)
    if (result.length > 1 && result[1] !== '') {
      return "invalid number"
    }
    result = input.match(regex)[0];

    if (result.indexOf("/") > -1) {
      let fractionNum = result.split('/');
      result = parseFloat(fractionNum[0]) / parseFloat(fractionNum[1]);
    }
    if (result === null || result === "") { result = 1 }
    return result;
  };

  this.getUnit = function (input) {
    let result;
    let regex = /[a-zA-Z%]+/g;
    result = input.match(regex)[0];
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit.toLowerCase()) {
      case "gal":
        result = "L";
        break;
      case "l":
        result = "gal";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      default:
        result = 'invalid unit'
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    switch (unit.toLowerCase()) {
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
      case "l":
        result = "liters";
        break;
      default:
        result = 'invalid unit'
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = {};
    switch (initUnit.toLowerCase()) {
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
      case "l":
        result.num = roundNum(initNum / galToL);
        result.unit = "gal";
        break;
      case "kg":
        result.num = roundNum(initNum / lbsToKg);
        result.unit = "lbs";
        break;
      case "km":
        result.num = roundNum(initNum / miToKm);
        result.unit = "mi";
        break;
    }
    console.log(`Input ${initNum} ${initUnit} and ${result}`)
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

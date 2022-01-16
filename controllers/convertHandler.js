const { resolveObjectURL } = require("buffer");

function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    let regex = /[+-]?(\d+)?(\.\d+)?(\/[+-]?(\d+)?(\.\d+)?)?/g;
    result = input.match(regex);
    //console.log(`getNum input ${input} and ${result}`)
    //Check for invalid number like 3/3/3 or 2.2.2
    //  The match will be '3/3' and '/3' or '2.2' and '.2'
    if (result.length > 1 && result[1] !== '') {
      return "invalid number"
    }
    result = input.match(regex)[0];

    //Default value to 1 for empty string
    if (result === "") { result = "1" }
    //Parse fraction string to float number
    if (result.indexOf("/") > -1) {
      let fractionNum = result.split('/');
      result = parseFloat(fractionNum[0]) / parseFloat(fractionNum[1]);
    }
    else {
      result = parseFloat(result)
    }

    //console.log(`getNum output ${result}`)
    return result;
  };

  this.getUnit = function (input) {
    let result;
    let regex = /[a-zA-Z%]+/g;
    result = input.match(regex);
    if (result === null) {
      return "invalid unit"
    } else {
      result = input.match(regex)[0]
    }
    //Set l to L and everything else in lowercase
    if (result.toLowerCase() === 'l') { result = "L" }
    else { result = result.toLowerCase() }

    //Check for invalid
    let check = this.getReturnUnit(result);
    if (check == "invalid unit") { result = check }
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
        result = 'invalid unit';
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = {};
    result.unit = this.getReturnUnit(initUnit);
    if (result.unit.toLowerCase() !== "invalid unit" && initNum !== "invalid number") {
      switch (initUnit.toLowerCase()) {
        case "gal":
          result.num = roundNum(initNum * galToL);
          break;
        case "lbs":
          result.num = roundNum(initNum * lbsToKg);
          break;
        case "mi":
          result.num = roundNum(initNum * miToKm);
          break;
        case "l":
          result.num = roundNum(initNum / galToL);
          break;
        case "kg":
          result.num = roundNum(initNum / lbsToKg);
          break;
        case "km":
          result.num = roundNum(initNum / miToKm);
          break;
        default:
          result.num = initNum
      }
    } else { result.num = initNum }

    console.log(`Input ${initNum} ${initUnit} and ${result.num} and ${result.unit}`)
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
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      result = 'invalid number and unit'
    }
    else if (initNum === 'invalid number') {
      result = initNum
    }
    else if (initUnit === 'invalid unit') {
      result = initUnit
    }
    else {
      result = `${initNum} ${this.spellOutUnit(
        initUnit
      )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    }
    return result;
  };
}

module.exports = ConvertHandler;

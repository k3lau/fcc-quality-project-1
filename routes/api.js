"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.route("/api/convert").get((req, res) => {
    let inputNum = convertHandler.getNum(req.query.input);
    let inputUnit = convertHandler.getUnit(req.query.input);
    console.log(inputNum);
    console.log(inputUnit);
    //initNum: inputNum
    //initUnit: inputUnit
    //returnNum: convertHandler.convert(inputNum, inputUnit).num,
    //returnUnit: convertHandler.convert(inputNum, inputUnit).unit
    //console.log(req.query);
    res.json({
      initNum: inputNum,
      initUnit: inputUnit,
      returnNum: convertHandler.convert(inputNum, inputUnit).num,
      returnUnit: convertHandler.convert(inputNum, inputUnit).unit,
      string: "TEST",
    });
  });
};

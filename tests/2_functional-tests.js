const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;
  test("Test a valid conversion", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "10L" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, "10");
        assert.equal(res.body.initUnit, "L");
        assert.approximately(res.body.returnNum, 10 / galToL, 0.001);
        assert.equal(res.body.returnUnit, "gal");
        done();
      });
  });
  test("Test a invalid input", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "32g" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid unit");
        done();
      });
  });
  test("Test a invalid number", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "3/7.2/4kg" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number");
        done();
      });
  });
  test("Test a invalid number and unit", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "3/7.2/4kilogagram" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number and unit");
        done();
      });
  });
  test("Test a no number unit", function (done) {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "kg" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, "1");
        assert.equal(res.body.initUnit, "kg");
        assert.approximately(res.body.returnNum, 1 / lbsToKg, 0.001);
        assert.equal(res.body.returnUnit, "lbs");
        done();
      });
  });
});

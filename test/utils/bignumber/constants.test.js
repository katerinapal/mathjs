"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _decimal = require("decimal.js");

var _decimal2 = _interopRequireDefault(_decimal);

var _constants = require("../../../lib/utils/bignumber/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Big32 = _decimal2.default.clone({ precision: 32 });
var Big64 = _decimal2.default.clone({ precision: 64 });

describe('bignumber', function () {

  it('should calculate a bignumber e', function () {
    _assert2.default.equal(constants.e(Big32), '2.7182818284590452353602874713527');
    _assert2.default.equal(constants.e(Big64), '2.718281828459045235360287471352662497757247093699959574966967628');
  });

  it('should calculate a bignumber pi', function () {
    _assert2.default.equal(constants.pi(Big32), '3.1415926535897932384626433832795');
    _assert2.default.equal(constants.pi(Big64), '3.141592653589793238462643383279502884197169399375105820974944592');
  });

  it('should calculate a bignumber tau', function () {
    _assert2.default.equal(constants.tau(Big32), '6.283185307179586476925286766559');
    _assert2.default.equal(constants.tau(Big64), '6.283185307179586476925286766559005768394338798750211641949889184');
  });

  it('should calculate a bignumber phi', function () {
    // FIXME: round-off error
    //assert.equal(bignumber.phi(32), '1.6180339887498948482045868343656');
    _assert2.default.equal(constants.phi(Big32), '1.6180339887498948482045868343657');
    _assert2.default.equal(constants.phi(Big64), '1.618033988749894848204586834365638117720309179805762862135448623');
  });
});

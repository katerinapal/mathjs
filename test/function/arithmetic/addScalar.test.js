"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _decimal = require("decimal.js");

var _decimal2 = _interopRequireDefault(_decimal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var approx = require('../../../tools/approx');
var math = require('../../../index');
var add = math.add;

// TODO: make unit tests independent of math
describe('add', function () {

  it('should add two numbers', function () {
    _assert2.default.equal(add(2, 3), 5);
    _assert2.default.equal(add(-2, 3), 1);
    _assert2.default.equal(add(2, -3), -1);
    _assert2.default.equal(add(-5, -3), -8);
  });

  it('should add booleans', function () {
    _assert2.default.equal(add(true, true), 2);
    _assert2.default.equal(add(true, false), 1);
    _assert2.default.equal(add(false, true), 1);
    _assert2.default.equal(add(false, false), 0);
  });

  it('should add numbers and null', function () {
    _assert2.default.equal(math.add(null, null), 0);
    _assert2.default.equal(math.add(null, 1), 1);
    _assert2.default.equal(math.add(1, null), 1);
  });

  it('should add mixed numbers and booleans', function () {
    _assert2.default.equal(add(2, true), 3);
    _assert2.default.equal(add(2, false), 2);
    _assert2.default.equal(add(true, 2), 3);
    _assert2.default.equal(add(false, 2), 2);
  });

  it('should add BigNumbers', function () {
    _assert2.default.deepEqual(add(new BigNumber(0.1), new BigNumber(0.2)), new BigNumber(0.3));
    _assert2.default.deepEqual(add(new BigNumber('2e5001'), new BigNumber('3e5000')), new BigNumber('2.3e5001'));
    _assert2.default.deepEqual(add(new BigNumber('9999999999999999999'), new BigNumber('1')), new BigNumber('1e19'));
  });

  it('should add mixed numbers and BigNumbers', function () {
    _assert2.default.deepEqual(add(new BigNumber(0.1), 0.2), new BigNumber(0.3));
    _assert2.default.deepEqual(add(0.1, new BigNumber(0.2)), new math.type.BigNumber(0.3));

    _assert2.default.throws(function () {
      add(1 / 3, new BigNumber(1));
    }, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);
    _assert2.default.throws(function () {
      add(new BigNumber(1), 1 / 3);
    }, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);
  });

  it('should add mixed booleans and BigNumbers', function () {
    _assert2.default.deepEqual(add(new BigNumber(0.1), true), new BigNumber(1.1));
    _assert2.default.deepEqual(add(new BigNumber(0.1), false), new BigNumber(0.1));
    _assert2.default.deepEqual(add(false, new BigNumber(0.2)), new math.type.BigNumber(0.2));
    _assert2.default.deepEqual(add(true, new BigNumber(0.2)), new math.type.BigNumber(1.2));
  });

  it('should add mixed complex numbers and BigNumbers', function () {
    _assert2.default.deepEqual(add(math.complex(3, -4), new BigNumber(2)), math.complex(5, -4));
    _assert2.default.deepEqual(add(new BigNumber(2), math.complex(3, -4)), math.complex(5, -4));
  });

  it('should add two complex numbers', function () {
    _assert2.default.equal(add(math.complex(3, -4), math.complex(8, 2)), '11 - 2i');
    _assert2.default.equal(add(math.complex(3, -4), 10), '13 - 4i');
    _assert2.default.equal(add(10, math.complex(3, -4)), '13 - 4i');
  });

  it('should add two fractions', function () {
    var a = math.fraction(1, 3);
    _assert2.default.equal(add(a, math.fraction(1, 6)).toString(), '0.5');
    _assert2.default.equal(a.toString(), '0.(3)');
    _assert2.default.equal(add(math.fraction(1, 5), math.fraction(2, 5)).toString(), '0.6');
    _assert2.default.equal(add(math.fraction(1), math.fraction(1, 3)).toString(), '1.(3)');
  });

  it('should add mixed fractions and numbers', function () {
    _assert2.default.deepEqual(add(1, math.fraction(1, 3)), math.fraction(4, 3));
    _assert2.default.deepEqual(add(math.fraction(1, 3), 1), math.fraction(4, 3));
  });

  it('should throw an error when converting a number with 15+ digits to fraction', function () {
    _assert2.default.throws(function () {
      add(math.pi, math.fraction(1, 3));
    }, /Cannot implicitly convert a number with >15 significant digits to Fraction/);
  });

  it('should convert strings to numbers', function () {
    _assert2.default.strictEqual(add('2', '3'), 5);
    _assert2.default.strictEqual(add(2, '3'), 5);
    _assert2.default.strictEqual(add('2', 3), 5);
  });

  it('should add two measures of the same unit', function () {
    approx.deepEqual(add(math.unit(5, 'km'), math.unit(100, 'mile')), math.unit(165.93, 'km'));

    approx.deepEqual(add(math.unit(math.fraction(1, 3), 'm'), math.unit(math.fraction(1, 3), 'm')).toString(), '2/3 m');

    approx.deepEqual(add(math.unit(math.complex(-3, 2), 'g'), math.unit(math.complex(5, -6), 'g')).toString(), '(2 - 4i) g');
  });

  it('should throw an error for two measures of different units', function () {
    _assert2.default.throws(function () {
      add(math.unit(5, 'km'), math.unit(100, 'gram'));
    });
  });

  it('should throw an error when one of the two units has undefined value', function () {
    _assert2.default.throws(function () {
      add(math.unit('km'), math.unit('5gram'));
    }, /Parameter x contains a unit with undefined value/);
    _assert2.default.throws(function () {
      add(math.unit('5 km'), math.unit('gram'));
    }, /Parameter y contains a unit with undefined value/);
  });

  it('should throw an error in case of a unit and non-unit argument', function () {
    _assert2.default.throws(function () {
      add(math.unit('5cm'), 2);
    }, /TypeError: Unexpected type of argument in function add/);
    _assert2.default.throws(function () {
      add(math.unit('5cm'), new Date());
    }, /TypeError: Unexpected type of argument in function add/);
    _assert2.default.throws(function () {
      add(new Date(), math.unit('5cm'));
    }, /TypeError: Unexpected type of argument in function add/);
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      add(1);
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      add(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX add', function () {
    var expression = math.parse('add(1,2)');
    _assert2.default.equal(expression.toTex(), '\\left(1+2\\right)');
  });
});

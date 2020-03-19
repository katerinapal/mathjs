"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

var _index = require("../../../index");

var _decimal = require("decimal.js");

var _decimal2 = _interopRequireDefault(_decimal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var add = _index.indexjs.add;

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
    _assert2.default.equal(_index.indexjs.add(null, null), 0);
    _assert2.default.equal(_index.indexjs.add(null, 1), 1);
    _assert2.default.equal(_index.indexjs.add(1, null), 1);
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
    _assert2.default.deepEqual(add(0.1, new BigNumber(0.2)), new _index.indexjs.type.BigNumber(0.3));

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
    _assert2.default.deepEqual(add(false, new BigNumber(0.2)), new _index.indexjs.type.BigNumber(0.2));
    _assert2.default.deepEqual(add(true, new BigNumber(0.2)), new _index.indexjs.type.BigNumber(1.2));
  });

  it('should add mixed complex numbers and BigNumbers', function () {
    _assert2.default.deepEqual(add(_index.indexjs.complex(3, -4), new BigNumber(2)), _index.indexjs.complex(5, -4));
    _assert2.default.deepEqual(add(new BigNumber(2), _index.indexjs.complex(3, -4)), _index.indexjs.complex(5, -4));
  });

  it('should add two complex numbers', function () {
    _assert2.default.equal(add(_index.indexjs.complex(3, -4), _index.indexjs.complex(8, 2)), '11 - 2i');
    _assert2.default.equal(add(_index.indexjs.complex(3, -4), 10), '13 - 4i');
    _assert2.default.equal(add(10, _index.indexjs.complex(3, -4)), '13 - 4i');
  });

  it('should add two fractions', function () {
    var a = _index.indexjs.fraction(1, 3);
    _assert2.default.equal(add(a, _index.indexjs.fraction(1, 6)).toString(), '0.5');
    _assert2.default.equal(a.toString(), '0.(3)');
    _assert2.default.equal(add(_index.indexjs.fraction(1, 5), _index.indexjs.fraction(2, 5)).toString(), '0.6');
    _assert2.default.equal(add(_index.indexjs.fraction(1), _index.indexjs.fraction(1, 3)).toString(), '1.(3)');
  });

  it('should add mixed fractions and numbers', function () {
    _assert2.default.deepEqual(add(1, _index.indexjs.fraction(1, 3)), _index.indexjs.fraction(4, 3));
    _assert2.default.deepEqual(add(_index.indexjs.fraction(1, 3), 1), _index.indexjs.fraction(4, 3));
  });

  it('should throw an error when converting a number with 15+ digits to fraction', function () {
    _assert2.default.throws(function () {
      add(_index.indexjs.pi, _index.indexjs.fraction(1, 3));
    }, /Cannot implicitly convert a number with >15 significant digits to Fraction/);
  });

  it('should convert strings to numbers', function () {
    _assert2.default.strictEqual(add('2', '3'), 5);
    _assert2.default.strictEqual(add(2, '3'), 5);
    _assert2.default.strictEqual(add('2', 3), 5);
  });

  it('should add two measures of the same unit', function () {
    (0, _approx.deepEqual)(add(_index.indexjs.unit(5, 'km'), _index.indexjs.unit(100, 'mile')), _index.indexjs.unit(165.93, 'km'));

    (0, _approx.deepEqual)(add(_index.indexjs.unit(_index.indexjs.fraction(1, 3), 'm'), _index.indexjs.unit(_index.indexjs.fraction(1, 3), 'm')).toString(), '2/3 m');

    (0, _approx.deepEqual)(add(_index.indexjs.unit(_index.indexjs.complex(-3, 2), 'g'), _index.indexjs.unit(_index.indexjs.complex(5, -6), 'g')).toString(), '(2 - 4i) g');
  });

  it('should throw an error for two measures of different units', function () {
    _assert2.default.throws(function () {
      add(_index.indexjs.unit(5, 'km'), _index.indexjs.unit(100, 'gram'));
    });
  });

  it('should throw an error when one of the two units has undefined value', function () {
    _assert2.default.throws(function () {
      add(_index.indexjs.unit('km'), _index.indexjs.unit('5gram'));
    }, /Parameter x contains a unit with undefined value/);
    _assert2.default.throws(function () {
      add(_index.indexjs.unit('5 km'), _index.indexjs.unit('gram'));
    }, /Parameter y contains a unit with undefined value/);
  });

  it('should throw an error in case of a unit and non-unit argument', function () {
    _assert2.default.throws(function () {
      add(_index.indexjs.unit('5cm'), 2);
    }, /TypeError: Unexpected type of argument in function add/);
    _assert2.default.throws(function () {
      add(_index.indexjs.unit('5cm'), new Date());
    }, /TypeError: Unexpected type of argument in function add/);
    _assert2.default.throws(function () {
      add(new Date(), _index.indexjs.unit('5cm'));
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
    var expression = _index.indexjs.parse('add(1,2)');
    _assert2.default.equal(expression.toTex(), '\\left(1+2\\right)');
  });
});

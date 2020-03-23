"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index');
var mathPredictable = _index.indexjs.create({ predictable: true });
var bignumber = _index.indexjs.bignumber;
var fraction = _index.indexjs.fraction;
var complex = _index.indexjs.complex;
var matrix = _index.indexjs.matrix;
var unit = _index.indexjs.unit;
var range = _index.indexjs.range;
var pow = _index.indexjs.pow;

describe('pow', function () {

  it('should exponentiate a number to the given power', function () {
    approx.deepEqual(pow(2, 3), 8);
    approx.deepEqual(pow(2, 4), 16);
    approx.deepEqual(pow(-2, 2), 4);
    approx.deepEqual(pow(3, 3), 27);
    approx.deepEqual(pow(3, -2), 0.111111111111111);
    approx.deepEqual(pow(-3, -2), 0.111111111111111);
    approx.deepEqual(pow(3, -3), 0.0370370370370370);
    approx.deepEqual(pow(-3, -3), -0.0370370370370370);
    approx.deepEqual(pow(2, 1.5), 2.82842712474619);
  });

  it('should exponentiate a negative number to a non-integer power', function () {
    approx.deepEqual(pow(-2, 1.5), complex(0, -2.82842712474619));
  });

  it('should exponentiate a negative number to a non-integer power with predictable:true', function () {
    var res = mathPredictable.pow(-2, 1.5);
    _assert2.default.equal(typeof res === "undefined" ? "undefined" : _typeof(res), 'number');
    (0, _assert2.default)(isNaN(res));
  });

  it('should return a real-valued root if one exists with predictable:true', function () {
    approx.equal(mathPredictable.pow(-8, 1 / 3), -2);
    approx.equal(mathPredictable.pow(-8, 2 / 3), 4);
    approx.equal(mathPredictable.pow(-8, 3 / 3), -8);
    approx.equal(mathPredictable.pow(-8, 4 / 3), 16);
    approx.equal(mathPredictable.pow(-8, 5 / 3), -32);
    approx.equal(mathPredictable.pow(-8, -5 / 3), -0.03125);
    approx.equal(mathPredictable.pow(-1, 2 / 3), 1);
    approx.equal(mathPredictable.pow(-1, 50 / 99), 1);
    approx.equal(mathPredictable.pow(-1, 49 / 99), -1);
    approx.equal(mathPredictable.pow(-17, 29 / 137), -1.8216292479175);
    approx.equal(mathPredictable.pow(-1, 0), 1);
    approx.equal(mathPredictable.pow(-1, 0.2), -1);
    approx.equal(mathPredictable.pow(-1, 1), -1);

    approx.equal(mathPredictable.pow(4, 2), 16);
    approx.equal(mathPredictable.pow(4, 0.5), 2);
    approx.equal(mathPredictable.pow(-4, 2), 16);

    (0, _assert2.default)(isNaN(mathPredictable.pow(-1, 49 / 100)));
    (0, _assert2.default)(isNaN(mathPredictable.pow(-17, 29 / 138)));
    (0, _assert2.default)(isNaN(mathPredictable.pow(-17, 3.14159265358979323)));
  });

  it('should exponentiate booleans to the given power', function () {
    _assert2.default.equal(pow(true, true), 1);
    _assert2.default.equal(pow(true, false), 1);
    _assert2.default.equal(pow(false, true), 0);
    _assert2.default.equal(pow(false, false), 1);
  });

  it('should exponentiate mixed numbers and booleans', function () {
    _assert2.default.equal(pow(2, true), 2);
    _assert2.default.equal(pow(2, false), 1);
    _assert2.default.equal(pow(true, 2), 1);
    _assert2.default.equal(pow(false, 2), 0);
  });

  it('should exponentiate numbers and null', function () {
    _assert2.default.equal(pow(1, null), 1);
    _assert2.default.equal(pow(null, 1), 0);
  });

  it('should exponentiate bignumbers', function () {
    _assert2.default.deepEqual(pow(bignumber(2), bignumber(3)), bignumber(8));
    _assert2.default.deepEqual(pow(bignumber(100), bignumber(500)), bignumber('1e1000'));

    _assert2.default.deepEqual(pow(bignumber(-1), bignumber(2)), bignumber('1'));
    _assert2.default.deepEqual(pow(bignumber(2), bignumber(1.5)), bignumber('2.828427124746190097603377448419396157139343750753896146353359476'));
  });

  it('should exponentiate a negative bignumber to a non-integer power', function () {
    approx.deepEqual(pow(bignumber(-2), bignumber(1.5)), complex(0, -2.82842712474619));
    approx.deepEqual(pow(-2, bignumber(1.5)), complex(0, -2.82842712474619));
    approx.deepEqual(pow(bignumber(-2), 1.5), complex(0, -2.82842712474619));
  });

  it('should exponentiate a negative bignumber to a non-integer power', function () {
    _assert2.default.ok(mathPredictable.pow(bignumber(-2), bignumber(1.5)).isNaN());
  });

  it('should exponentiate mixed numbers and bignumbers', function () {
    _assert2.default.deepEqual(pow(bignumber(2), 3), bignumber(8));
    _assert2.default.deepEqual(pow(2, bignumber(3)), bignumber(8));

    _assert2.default.throws(function () {
      pow(1 / 3, bignumber(2));
    }, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);
    _assert2.default.throws(function () {
      pow(bignumber(1), 1 / 3);
    }, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);
  });

  it('should exponentiate mixed booleans and bignumbers', function () {
    _assert2.default.deepEqual(pow(true, bignumber(3)), bignumber(1));
    _assert2.default.deepEqual(pow(false, bignumber(3)), bignumber(0));
    _assert2.default.deepEqual(pow(bignumber(3), false), bignumber(1));
    _assert2.default.deepEqual(pow(bignumber(3), true), bignumber(3));
  });

  it('should exponentiate a fraction to an integer power', function () {
    _assert2.default.deepEqual(_index.indexjs.pow(fraction(3), fraction(2)), fraction(9));
    _assert2.default.deepEqual(_index.indexjs.pow(fraction(1.5), fraction(2)), fraction(2.25));
    _assert2.default.deepEqual(_index.indexjs.pow(fraction(1.5), fraction(-2)), fraction(4, 9));
    _assert2.default.deepEqual(_index.indexjs.pow(fraction(1.5), 2), fraction(2.25));
  });

  it('should exponentiate a fraction to an non-integer power', function () {
    _assert2.default.throws(function () {
      mathPredictable.pow(fraction(3), fraction(1.5));
    }, /Function pow does not support non-integer exponents for fractions/);

    _assert2.default.strictEqual(_index.indexjs.pow(fraction(4), 1.5), 8);
    _assert2.default.strictEqual(_index.indexjs.pow(fraction(4), fraction(1.5)), 8);
  });

  it('should throw an error if used with wrong number of arguments', function () {
    _assert2.default.throws(function () {
      pow(1);
    }, /TypeError: Too few arguments in function pow/);
    _assert2.default.throws(function () {
      pow(1, 2, 3);
    }, /TypeError: Too many arguments in function pow \(expected: 2, actual: 3\)/);
  });

  it('should exponentiate a complex number to the given power', function () {
    approx.deepEqual(pow(complex(3, 0), 2), complex(9, 0));
    approx.deepEqual(pow(complex(0, 2), 2), complex(-4, 0));

    approx.deepEqual(pow(complex(-1, -1), complex(-1, -1)), complex('-0.0284750589322119 +  0.0606697332231795i'));
    approx.deepEqual(pow(complex(-1, -1), complex(-1, 1)), complex('-6.7536199239765713 +  3.1697803027015614i'));
    approx.deepEqual(pow(complex(-1, -1), complex(0, -1)), complex('0.0891447921553914 - 0.0321946742909677i'));
    approx.deepEqual(pow(complex(-1, -1), complex(0, 1)), complex('9.92340022667813 + 3.58383962127501i'));
    approx.deepEqual(pow(complex(-1, -1), complex(1, -1)), complex('-0.1213394664463591 -  0.0569501178644237i'));
    approx.deepEqual(pow(complex(-1, -1), complex(1, 1)), complex('-6.3395606054031211 - 13.5072398479531426i'));
    approx.deepEqual(pow(complex(-1, 1), complex(-1, -1)), complex('-6.7536199239765713 -  3.1697803027015614i'));
    approx.deepEqual(pow(complex(-1, 1), complex(-1, 1)), complex('-0.0284750589322119 -  0.0606697332231795i'));
    approx.deepEqual(pow(complex(-1, 1), complex(0, -1)), complex('9.92340022667813 - 3.58383962127501i'));
    approx.deepEqual(pow(complex(-1, 1), complex(0, 1)), complex('0.0891447921553914 + 0.0321946742909677i'));
    approx.deepEqual(pow(complex(-1, 1), complex(1, -1)), complex('-6.3395606054031211 + 13.5072398479531426i'));
    approx.deepEqual(pow(complex(-1, 1), complex(1, 1)), complex('-0.1213394664463591 +  0.0569501178644237i'));

    approx.deepEqual(pow(complex(0, -1), complex(-1, -1)), complex('0.000000000000000 + 0.207879576350762i'));
    approx.deepEqual(pow(complex(0, -1), complex(-1, 1)), complex('0.000000000000000 + 4.810477380965351i'));
    approx.deepEqual(pow(complex(0, -1), complex(1, -1)), complex('0.000000000000000 - 0.207879576350762i'));
    approx.deepEqual(pow(complex(0, -1), complex(1, 1)), complex('0.000000000000000 - 4.810477380965351i'));
    approx.deepEqual(pow(complex(0, 1), complex(-1, -1)), complex('0.000000000000000 - 4.810477380965351i'));
    approx.deepEqual(pow(complex(0, 1), complex(-1, 1)), complex('0.000000000000000 - 0.207879576350762i'));
    approx.deepEqual(pow(complex(0, 1), complex(1, -1)), complex('0.000000000000000 + 4.810477380965351i'));
    approx.deepEqual(pow(complex(0, 1), complex(1, 1)), complex('0.000000000000000 + 0.207879576350762i'));

    approx.deepEqual(pow(complex(1, -1), complex(-1, -1)), complex('0.2918503793793073 +  0.1369786269150605i'));
    approx.deepEqual(pow(complex(1, -1), complex(-1, 1)), complex('0.6589325864505904 +  1.4039396486303144i'));
    approx.deepEqual(pow(complex(1, -1), complex(0, -1)), complex('0.428829006294368 - 0.154871752464247i'));
    approx.deepEqual(pow(complex(1, -1), complex(0, 1)), complex('2.062872235080905 + 0.745007062179724i'));
    approx.deepEqual(pow(complex(1, -1), complex(1, -1)), complex('0.2739572538301211 -  0.5837007587586147i'));
    approx.deepEqual(pow(complex(1, -1), complex(1, 1)), complex('2.8078792972606288 -  1.3178651729011805i'));
    approx.deepEqual(pow(complex(1, 1), complex(-1, -1)), complex('0.6589325864505904 -  1.4039396486303144i'));
    approx.deepEqual(pow(complex(1, 1), complex(-1, 1)), complex('0.2918503793793073 -  0.1369786269150605i'));
    approx.deepEqual(pow(complex(1, 1), complex(0, -1)), complex('2.062872235080905 - 0.745007062179724i'));
    approx.deepEqual(pow(complex(1, 1), complex(0, 1)), complex('0.428829006294368 + 0.154871752464247i'));
    approx.deepEqual(pow(complex(1, 1), complex(1, -1)), complex('2.8078792972606288 +  1.3178651729011805i'));
    approx.deepEqual(pow(complex(1, 1), complex(1, 1)), complex('0.2739572538301211 +  0.5837007587586147i'));
  });

  it('should exponentiate a complex number to the given bignumber power', function () {
    approx.deepEqual(pow(complex(3, 0), _index.indexjs.bignumber(2)), complex(9, 0));
    approx.deepEqual(pow(complex(0, 2), _index.indexjs.bignumber(2)), complex(-4, 0));
  });

  it('should correctly calculate unit ^ number', function () {
    _assert2.default.equal(pow(unit('4 N'), 2).toString(), "16 N^2");
    _assert2.default.equal(pow(unit('0.25 m/s'), -0.5).toString(), "2 s^0.5 / m^0.5");
    _assert2.default.equal(pow(unit('123 hogshead'), 0).toString(), "1");
  });

  it('should return a cloned value and not affect the argument', function () {
    var unit1 = unit('2 m');
    var unit2 = pow(unit1, 2);

    _assert2.default.equal(unit1.toString(), '2 m');
    _assert2.default.equal(unit2.toString(), '4 m^2');
  });

  it('should return a valuelessUnit when calculating valuelessUnit ^ number', function () {
    _assert2.default.equal(pow(unit('kg^0.5 m^0.5 s^-1'), 2).toString(), "(kg m) / s^2");
  });

  it('should throw an error when doing number ^ unit', function () {
    _assert2.default.throws(function () {
      pow(2, unit('5cm'));
    });
  });

  it('should throw an error if used with a string', function () {
    _assert2.default.throws(function () {
      pow('text', 2);
    });
    _assert2.default.throws(function () {
      pow(2, 'text');
    });
  });

  it('should raise a square matrix to the power 2', function () {
    var a = [[1, 2], [3, 4]];
    var res = [[7, 10], [15, 22]];
    approx.deepEqual(pow(a, 2), res);
    approx.deepEqual(pow(matrix(a), 2), matrix(res));
  });

  it('should return identity matrix for power 0', function () {
    var a = [[1, 2], [3, 4]];
    var res = [[1, 0], [0, 1]];
    approx.deepEqual(pow(a, 0), res);
    approx.deepEqual(pow(matrix(a), 0), matrix(res));
  });

  it('should compute large size of square matrix', function () {
    var a = _index.indexjs.eye(30).valueOf();
    approx.deepEqual(pow(a, 1000), a);
    approx.deepEqual(pow(matrix(a), 1000), matrix(a));
  });

  it('should throw an error when calculating the power of a non square matrix', function () {
    _assert2.default.throws(function () {
      pow([1, 2, 3, 4], 2);
    });
    _assert2.default.throws(function () {
      pow([[1, 2, 3], [4, 5, 6]], 2);
    });
    _assert2.default.throws(function () {
      pow([[1, 2, 3], [4, 5, 6]], 2);
    });
  });

  it('should throw an error when raising a matrix to a non-integer power', function () {
    var a = [[1, 2], [3, 4]];
    _assert2.default.throws(function () {
      pow(a, 2.5);
    });
    _assert2.default.throws(function () {
      pow(a, [2, 3]);
    });
  });

  it('should LaTeX pow', function () {
    var expression = _index.indexjs.parse('pow(2,10)');
    _assert2.default.equal(expression.toTex(), '\\left(2\\right)^{10}');
  });
});

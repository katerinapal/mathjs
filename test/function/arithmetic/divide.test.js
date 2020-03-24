"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = {};
var divide = _index.indexjs.divide;
var bignumber = _index.indexjs.bignumber;
var complex = _index.indexjs.complex;

describe('divide', function () {
  it('should divide two numbers', function () {
    _assert2.default.equal(divide(4, 2), 2);
    _assert2.default.equal(divide(-4, 2), -2);
    _assert2.default.equal(divide(4, -2), -2);
    _assert2.default.equal(divide(-4, -2), 2);
    _assert2.default.equal(divide(4, 0), Infinity);
    _assert2.default.equal(divide(-4, 0), -Infinity);
    _assert2.default.equal(divide(0, -5), 0);
    _assert2.default.ok(isNaN(divide(0, 0)));
  });

  it('should divide booleans', function () {
    _assert2.default.equal(divide(true, true), 1);
    _assert2.default.equal(divide(true, false), Infinity);
    _assert2.default.equal(divide(false, true), 0);
    _assert2.default.ok(isNaN(divide(false, false)));
  });

  it('should divide numbers and null', function () {
    _assert2.default.equal(divide(1, null), Infinity);
    _assert2.default.equal(divide(null, 1), 0);
    (0, _assert2.default)(isNaN(divide(null, null)));
  });

  it('should divide mixed numbers and booleans', function () {
    _assert2.default.equal(divide(2, true), 2);
    _assert2.default.equal(divide(2, false), Infinity);
    approx.equal(divide(true, 2), 0.5);
    _assert2.default.equal(divide(false, 2), 0);
  });

  it('should divide bignumbers', function () {
    _assert2.default.deepEqual(divide(bignumber(0.3), bignumber(0.2)), bignumber(1.5));
    _assert2.default.deepEqual(divide(bignumber('2.6e5000'), bignumber('2')), bignumber('1.3e5000'));
  });

  it('should divide mixed numbers and bignumbers', function () {
    _assert2.default.deepEqual(divide(bignumber(0.3), 0.2), bignumber(1.5));
    _assert2.default.deepEqual(divide(0.3, bignumber(0.2)), bignumber(1.5));
    _assert2.default.deepEqual(divide(bignumber('2.6e5000'), 2), bignumber('1.3e5000'));

    _assert2.default.throws(function () {
      divide(1 / 3, bignumber(2));
    }, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);
    _assert2.default.throws(function () {
      divide(bignumber(1), 1 / 3);
    }, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);
  });

  it('should divide mixed booleans and bignumbers', function () {
    _assert2.default.deepEqual(divide(bignumber(0.3), true), bignumber(0.3));
    _assert2.default.deepEqual(divide(bignumber(0.3), false).toString(), 'Infinity');
    _assert2.default.deepEqual(divide(false, bignumber('2')), bignumber(0));
    _assert2.default.deepEqual(divide(true, bignumber('2')), bignumber(0.5));
  });

  it('should divide two complex numbers', function () {
    approx.deepEqual(divide(complex('2+3i'), 2), complex('1+1.5i'));
    approx.deepEqual(divide(complex('2+3i'), complex('4i')), complex('0.75 - 0.5i'));
    approx.deepEqual(divide(complex('2i'), complex('4i')), complex('0.5'));
    approx.deepEqual(divide(4, complex('1+2i')), complex('0.8 - 1.6i'));
    approx.deepEqual(divide(_index.indexjs.i, 0), complex(0, Infinity));
    approx.deepEqual(divide(complex(0, 1), 0), complex(0, Infinity));
    approx.deepEqual(divide(complex(1, 0), 0), complex(Infinity, 0));
    approx.deepEqual(divide(complex(0, 1), complex(0, 0)), complex(0, Infinity));
    approx.deepEqual(divide(complex(1, 1), complex(0, 0)), complex(Infinity, Infinity));
    approx.deepEqual(divide(complex(1, -1), complex(0, 0)), complex(Infinity, -Infinity));
    approx.deepEqual(divide(complex(-1, 1), complex(0, 0)), complex(-Infinity, Infinity));
    approx.deepEqual(divide(complex(1, 1), complex(0, 1)), complex(1, -1));
    approx.deepEqual(divide(complex(1, 1), complex(1, 0)), complex(1, 1));

    approx.deepEqual(divide(complex(2, 3), complex(4, 5)), complex('0.5609756097560976 + 0.0487804878048781i'));
    approx.deepEqual(divide(complex(2, 3), complex(4, -5)), complex('-0.170731707317073 + 0.536585365853659i'));
    approx.deepEqual(divide(complex(2, 3), complex(-4, 5)), complex('0.170731707317073 - 0.536585365853659i'));
    approx.deepEqual(divide(complex(2, 3), complex(-4, -5)), complex('-0.5609756097560976 - 0.0487804878048781i'));
    approx.deepEqual(divide(complex(2, -3), complex(4, 5)), complex('-0.170731707317073 - 0.536585365853659i'));
    approx.deepEqual(divide(complex(2, -3), complex(4, -5)), complex('0.5609756097560976 - 0.0487804878048781i'));
    approx.deepEqual(divide(complex(2, -3), complex(-4, 5)), complex('-0.5609756097560976 + 0.0487804878048781i'));
    approx.deepEqual(divide(complex(2, -3), complex(-4, -5)), complex('0.170731707317073 + 0.536585365853659i'));
    approx.deepEqual(divide(complex(-2, 3), complex(4, 5)), complex('0.170731707317073 + 0.536585365853659i'));
    approx.deepEqual(divide(complex(-2, 3), complex(4, -5)), complex('-0.5609756097560976 + 0.0487804878048781i'));
    approx.deepEqual(divide(complex(-2, 3), complex(-4, 5)), complex('0.5609756097560976 - 0.0487804878048781i'));
    approx.deepEqual(divide(complex(-2, 3), complex(-4, -5)), complex('-0.170731707317073 - 0.536585365853659i'));
    approx.deepEqual(divide(complex(-2, -3), complex(4, 5)), complex('-0.5609756097560976 - 0.0487804878048781i'));
    approx.deepEqual(divide(complex(-2, -3), complex(4, -5)), complex('0.170731707317073 - 0.536585365853659i'));
    approx.deepEqual(divide(complex(-2, -3), complex(-4, 5)), complex('-0.170731707317073 + 0.536585365853659i'));
    approx.deepEqual(divide(complex(-2, -3), complex(-4, -5)), complex('0.5609756097560976 + 0.0487804878048781i'));
  });

  it('should divide mixed complex numbers and numbers', function () {
    _assert2.default.deepEqual(divide(_index.indexjs.complex(6, -4), 2), _index.indexjs.complex(3, -2));
    _assert2.default.deepEqual(divide(1, _index.indexjs.complex(2, 4)), _index.indexjs.complex(0.1, -0.2));
  });

  it('should divide mixed complex numbers and bignumbers', function () {
    _assert2.default.deepEqual(divide(_index.indexjs.complex(6, -4), bignumber(2)), _index.indexjs.complex(3, -2));
    _assert2.default.deepEqual(divide(bignumber(1), _index.indexjs.complex(2, 4)), _index.indexjs.complex(0.1, -0.2));
  });

  it('should divide two fractions', function () {
    var a = _index.indexjs.fraction(1, 4);
    _assert2.default.equal(divide(a, _index.indexjs.fraction(1, 2)).toString(), '0.5');
    _assert2.default.equal(a.toString(), '0.25');
  });

  it('should divide mixed fractions and numbers', function () {
    _assert2.default.deepEqual(divide(1, _index.indexjs.fraction(3)), _index.indexjs.fraction(1, 3));
    _assert2.default.deepEqual(divide(_index.indexjs.fraction(1), 3), _index.indexjs.fraction(1, 3));
  });

  it('should divide units by a number', function () {
    _assert2.default.equal(divide(_index.indexjs.unit('5 m'), 10).toString(), '500 mm');
  });

  it('should divide valueless units by a number', function () {
    _assert2.default.equal(divide(_index.indexjs.unit('m'), 2).toString(), '500 mm');
  });

  it('should divide a number by a unit', function () {
    _assert2.default.equal(divide(20, _index.indexjs.unit('4 N s')).toString(), '5 N^-1 s^-1');
    _assert2.default.equal(divide(4, _index.indexjs.unit('W')).toString(), '4 W^-1');
    _assert2.default.equal(divide(2.5, _index.indexjs.unit('1.25 mm')).toString(), '2 mm^-1');
    _assert2.default.equal(divide(10, _index.indexjs.unit('4 mg/s')).toString(), '2.5 s / mg');

    _assert2.default.equal(divide(10, _index.indexjs.unit(_index.indexjs.fraction(4), 'mg/s')).toString(), '5/2 s / mg');

    approx.equal(_index.indexjs.format(divide(10, _index.indexjs.unit(_index.indexjs.complex(1, 2), 'm/s')), 14), '(2 - 4i) s / m');
  });

  it('should divide two units', function () {
    _assert2.default.equal(divide(_index.indexjs.unit('75 mi/h'), _index.indexjs.unit('40 mi/gal')).to('gal/minute').toString(), '0.03125 gal / minute');

    var a = _index.indexjs.unit(_index.indexjs.fraction(75), 'mi/h');
    var b = _index.indexjs.unit(_index.indexjs.fraction(40), 'mi/gal');
    _assert2.default.equal(divide(a, b).to('gal/minute').toString(), '1/32 gal / minute');

    var c = _index.indexjs.unit(_index.indexjs.complex(21, 1), 'kg');
    var d = _index.indexjs.unit(_index.indexjs.complex(2, -3), 's');
    _assert2.default.equal(divide(c, d).toString(), "(3 + 5.000000000000001i) kg / s");
  });

  it('should divide one valued unit by a valueless unit and vice-versa', function () {
    _assert2.default.equal(divide(_index.indexjs.unit('4 gal'), _index.indexjs.unit('L')).toString(), '15.141648');
    _assert2.default.equal(divide(_index.indexjs.unit('gal'), _index.indexjs.unit('4 L')).toString(), '0.946353');

    _assert2.default.equal(divide(_index.indexjs.unit('inch'), _index.indexjs.unit(_index.indexjs.fraction(1), 'cm')).toFraction(), '127/50');
  });

  it('should divide (but not simplify) two valueless units', function () {
    _assert2.default.equal(divide(_index.indexjs.unit('gal'), _index.indexjs.unit('L')).toString(), 'gal / L');
  });

  it('should divide units by a big number', function () {
    _assert2.default.equal(divide(_index.indexjs.unit('5 m'), bignumber(10)).toString(), '500 mm');
  });

  it('should divide each elements in a matrix by a number', function () {
    _assert2.default.deepEqual(divide([2, 4, 6], 2), [1, 2, 3]);
    a = _index.indexjs.matrix([[1, 2], [3, 4]]);
    _assert2.default.deepEqual(divide(a, 2), _index.indexjs.matrix([[0.5, 1], [1.5, 2]]));
    _assert2.default.deepEqual(divide(a.valueOf(), 2), [[0.5, 1], [1.5, 2]]);
    _assert2.default.deepEqual(divide([], 2), []);
    _assert2.default.deepEqual(divide([], 2), []);
  });

  it('should divide 1 over a matrix (matrix inverse)', function () {
    approx.deepEqual(divide(1, [[1, 4, 7], [3, 0, 5], [-1, 9, 11]]), [[5.625, -2.375, -2.5], [4.75, -2.25, -2], [-3.375, 1.625, 1.5]]);
  });

  it('should perform matrix division', function () {
    a = _index.indexjs.matrix([[1, 2], [3, 4]]);
    b = _index.indexjs.matrix([[5, 6], [7, 8]]);
    _assert2.default.deepEqual(divide(a, b), _index.indexjs.matrix([[3, -2], [2, -1]]));
  });

  it('should divide a matrix by a matrix containing a scalar', function () {
    _assert2.default.throws(function () {
      divide(a, [[1]]);
    });
  });

  /*
  // These are supported now --ericman314
  it('should throw an error if dividing a number by a unit', function() {
    assert.throws(function () {divide(10, math.unit('5 m')).toString()});
  });
    it('should throw an error if dividing a unit by a non-number', function() {
    assert.throws(function () {divide(math.unit('5 m'), math.unit('5cm')).toString()});
  });
  */

  it('should throw an error if there\'s wrong number of arguments', function () {
    _assert2.default.throws(function () {
      divide(2, 3, 4);
    });
    _assert2.default.throws(function () {
      divide(2);
    });
  });

  it('should LaTeX divide', function () {
    var expression = _index.indexjs.parse('divide(1,2)');
    _assert2.default.equal(expression.toTex(), '\\frac{1}{2}');
  });
});

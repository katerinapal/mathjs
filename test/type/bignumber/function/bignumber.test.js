"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../../lib/error/index'),
    bignumber = _index.indexjs.bignumber,
    BigNumber = _index.indexjs.type.BigNumber;

describe('bignumber', function () {

  it('should create a bignumber', function () {
    // no arguments
    var n = bignumber();
    _assert2.default.ok(n instanceof BigNumber);
    _assert2.default.equal(n.valueOf(), '0');

    // from number
    var a = bignumber(0.1);
    _assert2.default.ok(a instanceof BigNumber);
    _assert2.default.equal(a.valueOf(), '0.1');

    // from Fraction
    var a = bignumber(_index.indexjs.fraction(0.1));
    _assert2.default.ok(a instanceof BigNumber);
    _assert2.default.equal(a.valueOf(), '0.1');

    // from number with >15 digits
    var a2 = bignumber(1 / 3);
    _assert2.default.ok(a2 instanceof BigNumber);
    _assert2.default.equal(a2.valueOf(), '0.3333333333333333');

    // from string
    var b = bignumber('0.1');
    _assert2.default.ok(b instanceof BigNumber);
    _assert2.default.equal(b.valueOf(), '0.1');

    // from boolean
    var c = bignumber(true);
    _assert2.default.ok(c instanceof BigNumber);
    _assert2.default.equal(c.valueOf(), '1');

    // from null
    var c = bignumber(null);
    _assert2.default.ok(c instanceof BigNumber);
    _assert2.default.equal(c.valueOf(), '0');

    // from array
    var d = bignumber([0.1, 0.2, '0.3']);
    _assert2.default.ok(Array.isArray(d));
    _assert2.default.equal(d.length, 3);
    _assert2.default.ok(d[0] instanceof BigNumber);
    _assert2.default.ok(d[1] instanceof BigNumber);
    _assert2.default.ok(d[2] instanceof BigNumber);
    _assert2.default.equal(d[0].valueOf(), '0.1');
    _assert2.default.equal(d[1].valueOf(), '0.2');
    _assert2.default.equal(d[2].valueOf(), '0.3');

    // from matrix
    var e = bignumber(_index.indexjs.matrix([0.1, 0.2]));
    _assert2.default.ok(e instanceof _index.indexjs.type.Matrix);
    _assert2.default.deepEqual(e.size(), [2]);
    _assert2.default.ok(e.get([0]) instanceof BigNumber);
    _assert2.default.ok(e.get([1]) instanceof BigNumber);
    _assert2.default.equal(e.get([0]).valueOf(), '0.1');
    _assert2.default.equal(e.get([1]).valueOf(), '0.2');

    // really big
    var f = bignumber('1.2e500');
    _assert2.default.equal(f.valueOf(), '1.2e+500');
  });

  it('should create a bignumber from a fraction', function () {
    var f = _index.indexjs.fraction(2, 3);
    var b = _index.indexjs.bignumber(f);
    _assert2.default.equal(b.toString(), '0.6666666666666666666666666666666666666666666666666666666666666667');
  });

  it('should apply precision setting to bignumbers', function () {
    var mymath = _index.indexjs.create({
      precision: 32
    });

    var a = mymath.bignumber(1).dividedBy(3);
    _assert2.default.equal(a.toString(), '0.33333333333333333333333333333333');
  });

  it('should throw an error in case of unsupported type of argument', function () {
    _assert2.default.throws(function () {
      _index.indexjs.bignumber(new Date());
    }, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.bignumber(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX bignumber', function () {
    var expr1 = _index.indexjs.parse('bignumber()');
    var expr2 = _index.indexjs.parse('bignumber(1)');

    _assert2.default.equal(expr1.toTex(), '0');
    _assert2.default.equal(expr2.toTex(), '\\left(1\\right)');
  });
});

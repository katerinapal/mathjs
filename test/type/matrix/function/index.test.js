"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test index construction
var Range = _index.indexjs.type.Range,
    ImmutableDenseMatrix = _index.indexjs.type.ImmutableDenseMatrix;

describe('index', function () {

  it('should create an index', function () {
    var index = _index.indexjs.index(new Range(2, 6));
    _assert2.default.ok(index instanceof _index.indexjs.type.Index);
    _assert2.default.deepEqual(index._dimensions, [{ start: 2, end: 6, step: 1 }]);

    var index2 = _index.indexjs.index(new Range(0, 4), new Range(5, 2, -1));
    _assert2.default.ok(index2 instanceof _index.indexjs.type.Index);
    _assert2.default.deepEqual(index2._dimensions, [{ start: 0, end: 4, step: 1 }, { start: 5, end: 2, step: -1 }]);
  });

  it('should create an index from bignumbers (downgrades to numbers)', function () {
    var index = _index.indexjs.index(new Range(_index.indexjs.bignumber(2), _index.indexjs.bignumber(6)), _index.indexjs.bignumber(3));
    _assert2.default.ok(index instanceof _index.indexjs.type.Index);
    _assert2.default.deepEqual(index._dimensions, [new Range(2, 6, 1), new ImmutableDenseMatrix([3])]);
  });

  it('should LaTeX index', function () {
    var expr1 = _index.indexjs.parse('index(1)');
    var expr2 = _index.indexjs.parse('index(1,2)');
    var expr3 = _index.indexjs.parse('index(1,2,3)');

    _assert2.default.equal(expr1.toTex(), '\\mathrm{index}\\left(1\\right)');
    _assert2.default.equal(expr2.toTex(), '\\mathrm{index}\\left(1,2\\right)');
    _assert2.default.equal(expr3.toTex(), '\\mathrm{index}\\left(1,2,3\\right)');
  });
});

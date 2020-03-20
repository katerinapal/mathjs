"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reviver = _index.indexjs.json.reviver;
var Range = _index.indexjs.type.Range;

describe('reviver', function () {

  it('should parse generic JSON', function () {
    var json = '{"foo":[1,2,3],"bar":null,"baz":"str"}';
    var data = { foo: [1, 2, 3], bar: null, baz: 'str' };
    _assert2.default.deepEqual(JSON.parse(json, reviver), data);
  });

  it('should parse a stringified complex number', function () {
    var json = '{"mathjs":"Complex","re":2,"im":4}';
    var c = new _index.indexjs.type.Complex(2, 4);

    var obj = JSON.parse(json, reviver);

    (0, _assert2.default)(obj instanceof _index.indexjs.type.Complex);
    _assert2.default.deepEqual(obj, c);
  });

  it('should parse a stringified BigNumber', function () {
    var json = '{"mathjs":"BigNumber","value":"0.2"}';
    var b = new _index.indexjs.type.BigNumber(0.2);

    var obj = JSON.parse(json, reviver);

    (0, _assert2.default)(obj instanceof _index.indexjs.type.BigNumber);
    _assert2.default.deepEqual(obj, b);
  });

  it('should parse a stringified Fraction', function () {
    var json = '{"mathjs":"Fraction","n":3,"d":8}';
    var b = new _index.indexjs.type.Fraction(0.375);

    var obj = JSON.parse(json, reviver);

    (0, _assert2.default)(obj instanceof _index.indexjs.type.Fraction);
    _assert2.default.strictEqual(obj.s, b.s);
    _assert2.default.strictEqual(obj.n, b.n);
    _assert2.default.strictEqual(obj.d, b.d);
  });

  it('should parse a stringified Range', function () {
    var json = '{"mathjs":"Range","start":2,"end":10}';
    var r = new _index.indexjs.type.Range(2, 10);

    var obj = JSON.parse(json, reviver);

    (0, _assert2.default)(obj instanceof _index.indexjs.type.Range);
    _assert2.default.deepEqual(obj, r);
  });

  it('should parse a stringified Unit', function () {
    var json = '{"mathjs":"Unit","value":5,"unit":"cm","fixPrefix":false}';
    var u = new _index.indexjs.type.Unit(5, 'cm');

    var obj = JSON.parse(json, reviver);

    (0, _assert2.default)(obj instanceof _index.indexjs.type.Unit);
    _assert2.default.deepEqual(obj, u);
  });

  it('should parse a stringified Range (2)', function () {
    var json = '{"mathjs":"Range","start":2,"end":10,"step":2}';
    var r = new _index.indexjs.type.Range(2, 10, 2);

    var obj = JSON.parse(json, reviver);

    (0, _assert2.default)(obj instanceof _index.indexjs.type.Range);
    _assert2.default.deepEqual(obj, r);
  });

  it('should parse a stringified ResultSet', function () {
    var json = '{"mathjs":"ResultSet","entries":[1,2,{"mathjs":"Complex","re":3,"im":4}]}';
    var r = new _index.indexjs.type.ResultSet([1, 2, new _index.indexjs.type.Complex(3, 4)]);

    var obj = JSON.parse(json, reviver);

    (0, _assert2.default)(obj instanceof _index.indexjs.type.ResultSet);
    _assert2.default.deepEqual(obj, r);
  });

  it('should parse a stringified Index', function () {
    var json = '{"mathjs":"Index","dimensions":[' + '{"mathjs":"Range","start":0,"end":10,"step":1},' + '{"mathjs":"Range","start":2,"end":3,"step":1}' + ']}';
    var i = new _index.indexjs.type.Index(new Range(0, 10), new Range(2, 3));

    var obj = JSON.parse(json, reviver);

    (0, _assert2.default)(obj instanceof _index.indexjs.type.Index);
    _assert2.default.deepEqual(obj, i);
  });

  it('should parse a stringified Index (2)', function () {
    var json = '{"mathjs":"Index","dimensions":[[0, 10],2]}';
    var i = new _index.indexjs.type.Index([0, 10], 2);

    var obj = JSON.parse(json, reviver);

    (0, _assert2.default)(obj instanceof _index.indexjs.type.Index);
    _assert2.default.deepEqual(obj, i);
  });

  it('should parse a stringified Matrix, dense storage format', function () {
    var json = '{"mathjs":"DenseMatrix","data":[[1,2],[3,4]],"size":[2,2]}';
    var m = _index.indexjs.matrix([[1, 2], [3, 4]], 'dense');

    var obj = JSON.parse(json, reviver);

    (0, _assert2.default)(obj instanceof _index.indexjs.type.Matrix);
    _assert2.default.deepEqual(obj, m);
  });

  it('should parse a stringified Matrix containing a complex number, dense storage format', function () {
    var json = '{"mathjs":"DenseMatrix","data":[[1,2],[3,{"mathjs":"Complex","re":4,"im":5}]],"size":[2,2]}';
    var c = new _index.indexjs.type.Complex(4, 5);
    var m = _index.indexjs.matrix([[1, 2], [3, c]], 'dense');

    var obj = JSON.parse(json, reviver);

    (0, _assert2.default)(obj instanceof _index.indexjs.type.Matrix);
    (0, _assert2.default)(obj._data[1][1] instanceof _index.indexjs.type.Complex);
    _assert2.default.deepEqual(obj, m);
  });

  it('should parse a Matrix, sparse', function () {
    var json = '{"mathjs":"SparseMatrix","values":[1,3,2,4],"index":[0,1,0,1],"ptr":[0,2,4],"size":[2,2]}';
    var m = _index.indexjs.matrix([[1, 2], [3, 4]], 'sparse');

    var obj = JSON.parse(json, reviver);

    (0, _assert2.default)(obj instanceof _index.indexjs.type.SparseMatrix);
    (0, _assert2.default)(obj instanceof _index.indexjs.type.Matrix);
    _assert2.default.deepEqual(obj, m);
  });

  it('should parse a stringified Help', function () {
    var json = '{"mathjs":"Help","name":"foo","description":"bar"}';
    var h = new _index.indexjs.type.Help({ name: 'foo', description: 'bar' });
    var obj = JSON.parse(json, reviver);

    (0, _assert2.default)(obj instanceof _index.indexjs.type.Help);
    _assert2.default.deepEqual(obj, h);
  });
});

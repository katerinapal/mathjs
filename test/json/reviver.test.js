import assert from "assert";
import { indexjs as index_indexjsjs } from "../../index";
var reviver = index_indexjsjs.json.reviver;
var Range = index_indexjsjs.type.Range;

describe('reviver', function () {

  it('should parse generic JSON', function () {
    var json = '{"foo":[1,2,3],"bar":null,"baz":"str"}';
    var data = {foo: [1,2,3], bar: null, baz: 'str'};
    assert.deepEqual(JSON.parse(json, reviver), data);
  });

  it('should parse a stringified complex number', function () {
    var json = '{"mathjs":"Complex","re":2,"im":4}';
    var c = new index_indexjsjs.type.Complex(2, 4);

    var obj = JSON.parse(json, reviver);

    assert(obj instanceof index_indexjsjs.type.Complex);
    assert.deepEqual(obj, c);
  });

  it('should parse a stringified BigNumber', function () {
    var json = '{"mathjs":"BigNumber","value":"0.2"}';
    var b = new index_indexjsjs.type.BigNumber(0.2);

    var obj = JSON.parse(json, reviver);

    assert(obj instanceof index_indexjsjs.type.BigNumber);
    assert.deepEqual(obj, b);
  });

  it('should parse a stringified Fraction', function () {
    var json = '{"mathjs":"Fraction","n":3,"d":8}';
    var b = new index_indexjsjs.type.Fraction(0.375);

    var obj = JSON.parse(json, reviver);

    assert(obj instanceof index_indexjsjs.type.Fraction);
    assert.strictEqual(obj.s, b.s);
    assert.strictEqual(obj.n, b.n);
    assert.strictEqual(obj.d, b.d);
  });

  it('should parse a stringified Range', function () {
    var json = '{"mathjs":"Range","start":2,"end":10}';
    var r = new index_indexjsjs.type.Range(2, 10);

    var obj = JSON.parse(json, reviver);

    assert(obj instanceof index_indexjsjs.type.Range);
    assert.deepEqual(obj, r);
  });

  it('should parse a stringified Unit', function () {
    var json = '{"mathjs":"Unit","value":5,"unit":"cm","fixPrefix":false}';
    var u = new index_indexjsjs.type.Unit(5, 'cm');

    var obj = JSON.parse(json, reviver);

    assert(obj instanceof index_indexjsjs.type.Unit);
    assert.deepEqual(obj, u);
  });

  it('should parse a stringified Range (2)', function () {
    var json = '{"mathjs":"Range","start":2,"end":10,"step":2}';
    var r = new index_indexjsjs.type.Range(2, 10, 2);

    var obj = JSON.parse(json, reviver);

    assert(obj instanceof index_indexjsjs.type.Range);
    assert.deepEqual(obj, r);
  });

  it('should parse a stringified ResultSet', function () {
    var json = '{"mathjs":"ResultSet","entries":[1,2,{"mathjs":"Complex","re":3,"im":4}]}';
    var r = new index_indexjsjs.type.ResultSet([1,2,new index_indexjsjs.type.Complex(3,4)]);

    var obj = JSON.parse(json, reviver);

    assert(obj instanceof index_indexjsjs.type.ResultSet);
    assert.deepEqual(obj, r);
  });

  it('should parse a stringified Index', function () {
    var json = '{"mathjs":"Index","dimensions":[' +
        '{"mathjs":"Range","start":0,"end":10,"step":1},' +
        '{"mathjs":"Range","start":2,"end":3,"step":1}' +
        ']}';
    var i = new index_indexjsjs.type.Index(new Range(0, 10), new Range(2, 3));

    var obj = JSON.parse(json, reviver);

    assert(obj instanceof index_indexjsjs.type.Index);
    assert.deepEqual(obj, i);
  });

  it('should parse a stringified Index (2)', function () {
    var json = '{"mathjs":"Index","dimensions":[[0, 10],2]}';
    var i = new index_indexjsjs.type.Index([0, 10], 2);

    var obj = JSON.parse(json, reviver);

    assert(obj instanceof index_indexjsjs.type.Index);
    assert.deepEqual(obj, i);
  });

  it('should parse a stringified Matrix, dense storage format', function () {
    var json = '{"mathjs":"DenseMatrix","data":[[1,2],[3,4]],"size":[2,2]}';
    var m = index_indexjsjs.matrix([[1,2],[3,4]], 'dense');

    var obj = JSON.parse(json, reviver);

    assert(obj instanceof index_indexjsjs.type.Matrix);
    assert.deepEqual(obj, m);
  });

  it('should parse a stringified Matrix containing a complex number, dense storage format', function () {
    var json = '{"mathjs":"DenseMatrix","data":[[1,2],[3,{"mathjs":"Complex","re":4,"im":5}]],"size":[2,2]}';
    var c = new index_indexjsjs.type.Complex(4, 5);
    var m = index_indexjsjs.matrix([[1,2],[3,c]], 'dense');

    var obj = JSON.parse(json, reviver);

    assert(obj instanceof index_indexjsjs.type.Matrix);
    assert(obj._data[1][1] instanceof index_indexjsjs.type.Complex);
    assert.deepEqual(obj, m);
  });

  it('should parse a Matrix, sparse', function () {
    var json = '{"mathjs":"SparseMatrix","values":[1,3,2,4],"index":[0,1,0,1],"ptr":[0,2,4],"size":[2,2]}';
    var m = index_indexjsjs.matrix([[1,2],[3,4]], 'sparse');

    var obj = JSON.parse(json, reviver);

    assert(obj instanceof index_indexjsjs.type.SparseMatrix);
    assert(obj instanceof index_indexjsjs.type.Matrix);
    assert.deepEqual(obj, m);
  });

  it('should parse a stringified Help', function () {
    var json = '{"mathjs":"Help","name":"foo","description":"bar"}';
    var h = new index_indexjsjs.type.Help({name: 'foo', description: 'bar'});
    var obj = JSON.parse(json, reviver);

    assert(obj instanceof index_indexjsjs.type.Help);
    assert.deepEqual(obj, h);
  });

});

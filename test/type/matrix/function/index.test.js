import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../../index";
// test index construction
var Range = index_indexjsjs.type.Range, ImmutableDenseMatrix = index_indexjsjs.type.ImmutableDenseMatrix;

describe('index', function() {

  it('should create an index', function() {
    var index = index_indexjsjs.index(new Range(2,6));
    assert.ok(index instanceof index_indexjsjs.type.Index);
    assert.deepEqual(index._dimensions, [{start:2, end:6, step:1}]);

    var index2 = index_indexjsjs.index(new Range(0,4), new Range(5,2,-1));
    assert.ok(index2 instanceof index_indexjsjs.type.Index);
    assert.deepEqual(index2._dimensions, [{start:0, end:4, step: 1}, {start:5, end: 2, step:-1}]);
  });

  it('should create an index from bignumbers (downgrades to numbers)', function() {
    var index = index_indexjsjs.index(new Range(index_indexjsjs.bignumber(2), index_indexjsjs.bignumber(6)), index_indexjsjs.bignumber(3));
    assert.ok(index instanceof index_indexjsjs.type.Index);
    assert.deepEqual(index._dimensions, [new Range(2, 6, 1), new ImmutableDenseMatrix([3])]);
  });

  it('should LaTeX index', function () {
    var expr1 = index_indexjsjs.parse('index(1)');
    var expr2 = index_indexjsjs.parse('index(1,2)');
    var expr3 = index_indexjsjs.parse('index(1,2,3)');

    assert.equal(expr1.toTex(), '\\mathrm{index}\\left(1\\right)');
    assert.equal(expr2.toTex(), '\\mathrm{index}\\left(1,2\\right)');
    assert.equal(expr3.toTex(), '\\mathrm{index}\\left(1,2,3\\right)');
  });

});

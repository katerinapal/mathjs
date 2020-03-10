import assert_moduleDefault from "assert";
import { approx as approxjs } from "../../../../tools/approx";
import { market as matrixmarketjs, import as matrixmarketjs_import } from "../../../../tools/matrixmarket";
import { math as indexjs } from "../../../../index";
import * as cs_permutejs from "../../../../lib/function/algebra/sparse/cs_permute";
import * as cs_lujs from "../../../../lib/function/algebra/sparse/cs_lu";
import * as cs_sqrjs from "../../../../lib/function/algebra/sparse/cs_sqr";
var assert = {};
var approx = approxjs;
var market = matrixmarketjs;
var math = indexjs;
indexjs.import(cs_permutejs);
indexjs.import(cs_lujs);
indexjs.import(cs_sqrjs);

var cs_permute = indexjs.sparse.cs_permute;
var cs_lu = indexjs.sparse.cs_lu;
var cs_sqr = indexjs.sparse.cs_sqr;

describe('cs_lu', function () {

  it('should decompose matrix, 2 x 2, no symbolic ordering and analysis, partial pivoting', function () {
    
    var m = indexjs.sparse([[2, 1], [1, 4]]);
    
    // partial pivoting
    var r = cs_lu(m, null, 1);

    // L
    assert.deepEqual(r.L.valueOf(), [[1, 0], [0.5, 1]]);
    // U
    assert.deepEqual(r.U.valueOf(), [[2, 1], [0, 3.5]]);
    // P
    assert.deepEqual(r.pinv, [0, 1]);
    // verify
    approxjs.deepEqual(cs_permute(m, r.pinv, null, true), indexjs.multiply(r.L, r.U));
  });
  
  it('should decompose matrix, 4 x 4, natural ordering (order=0), partial pivoting', function () {

    var m = indexjs.sparse(
      [
        [4.5,   0, 3.2,   0],
        [3.1, 2.9,   0, 0.9],
        [0,   1.7,   3,   0],
        [3.5, 0.4,   0,   1]
      ]);
    
    // symbolic ordering and analysis, order = 0
    var s = cs_sqr(0, m, false);
    
    // partial pivoting
    var r = cs_lu(m, s, 1);

    // verify
    approxjs.deepEqual(cs_permute(m, r.pinv, s.q, true).valueOf(), indexjs.multiply(r.L, r.U).valueOf());
  });

  it('should decompose matrix, 4 x 4, amd(A+A\') (order=1), partial pivoting', function () {

    var m = indexjs.sparse(
      [
        [4.5,   0, 3.2,   0],
        [3.1, 2.9,   0, 0.9],
        [0,   1.7,   3,   0],
        [3.5, 0.4,   0,   1]
      ]);

    // symbolic ordering and analysis, order = 1
    var s = cs_sqr(1, m, false);

    // partial pivoting
    var r = cs_lu(m, s, 1);

    // verify
    approxjs.deepEqual(cs_permute(m, r.pinv, s.q, true).valueOf(), indexjs.multiply(r.L, r.U).valueOf());
  });

  it('should decompose matrix, 4 x 4, amd(A\'*A) (order=2), partial pivoting', function () {

    var m = indexjs.sparse(
      [
        [4.5,   0, 3.2,   0],
        [3.1, 2.9,   0, 0.9],
        [0,   1.7,   3,   0],
        [3.5, 0.4,   0,   1]
      ]);

    // symbolic ordering and analysis, order = 2
    var s = cs_sqr(2, m, false);

    // partial pivoting
    var r = cs_lu(m, s, 1);

    // verify
    approxjs.deepEqual(cs_permute(m, r.pinv, s.q, true).valueOf(), indexjs.multiply(r.L, r.U).valueOf());
  });

  it('should decompose matrix, 4 x 4, amd(A\'*A) (order=3), partial pivoting', function () {

    var m = indexjs.sparse(
      [
        [4.5,   0, 3.2,   0],
        [3.1, 2.9,   0, 0.9],
        [0,   1.7,   3,   0],
        [3.5, 0.4,   0,   1]
      ]);

    // symbolic ordering and analysis, order = 3
    var s = cs_sqr(3, m, false);

    // partial pivoting
    var r = cs_lu(m, s, 1);

    // verify
    approxjs.deepEqual(cs_permute(m, r.pinv, s.q, true).valueOf(), indexjs.multiply(r.L, r.U).valueOf());
  });
  
  it('should decompose matrix, 48 x 48, natural ordering (order=0), full pivoting, matrix market', function (done) {
    // import matrix
    matrixmarketjs_import('tools/matrices/bcsstk01.tar.gz', ['bcsstk01/bcsstk01.mtx'])
      .then(function (matrices) {
        // matrix
        var m = matrices[0];

        // symbolic ordering and analysis, order = 0
        var s = cs_sqr(0, m, false);

        // full pivoting
        var r = cs_lu(m, s, 0.001);

        // verify
        approxjs.deepEqual(cs_permute(m, r.pinv, s.q, true).valueOf(), indexjs.multiply(r.L, r.U).valueOf());

        // indicate test has completed
        done();
      })
      .fail(function (error) {
        // indicate test has completed
        done(error);
      });
  });

  it('should decompose matrix, 48 x 48, amd(A+A\') (order=1), full pivoting, matrix market', function (done) {
    // import matrix
    matrixmarketjs_import('tools/matrices/bcsstk01.tar.gz', ['bcsstk01/bcsstk01.mtx'])
      .then(function (matrices) {
        // matrix
        var m = matrices[0];

        // symbolic ordering and analysis, order = 1
        var s = cs_sqr(1, m, false);

        // full pivoting
        var r = cs_lu(m, s, 0.001);

        // verify
        approxjs.deepEqual(cs_permute(m, r.pinv, s.q, true).valueOf(), indexjs.multiply(r.L, r.U).valueOf());

        // indicate test has completed
        done();
      })
      .fail(function (error) {
        // indicate test has completed
        done(error);
      });
  });

  it('should decompose matrix, 48 x 48, amd(A\'*A) (order=2), full pivoting, matrix market', function (done) {
    // import matrix
    matrixmarketjs_import('tools/matrices/bcsstk01.tar.gz', ['bcsstk01/bcsstk01.mtx'])
      .then(function (matrices) {
        // matrix
        var m = matrices[0];

        // symbolic ordering and analysis, order = 2
        var s = cs_sqr(2, m, false);

        // full pivoting
        var r = cs_lu(m, s, 0.001);

        // verify
        approxjs.deepEqual(cs_permute(m, r.pinv, s.q, true).valueOf(), indexjs.multiply(r.L, r.U).valueOf());

        // indicate test has completed
        done();
      })
      .fail(function (error) {
        // indicate test has completed
        done(error);
      });
  });
  
  it('should decompose matrix, 48 x 48, amd(A\'*A) (order=3), full pivoting, matrix market', function (done) {
    // import matrix
    matrixmarketjs_import('tools/matrices/bcsstk01.tar.gz', ['bcsstk01/bcsstk01.mtx'])
      .then(function (matrices) {
        // matrix
        var m = matrices[0];

        // symbolic ordering and analysis, order = 3
        var s = cs_sqr(3, m, false);

        // full pivoting
        var r = cs_lu(m, s, 0.001);

        // verify
        approxjs.deepEqual(cs_permute(m, r.pinv, s.q, true).valueOf(), indexjs.multiply(r.L, r.U).valueOf());

        // indicate test has completed
        done();
      })
      .fail(function (error) {
        // indicate test has completed
        done(error);
      });
  });
});
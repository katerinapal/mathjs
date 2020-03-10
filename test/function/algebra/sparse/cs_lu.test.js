import assert from "assert";
import { toolsapprox } from "../../../../tools/approx";
import { toolsmatrixmarket, import as matrixmarketjs_import } from "../../../../tools/matrixmarket";
import { index } from "../../../../index";
import * as libfunctionalgebrasparsecs_permute from "../../../../lib/function/algebra/sparse/cs_permute";
import * as libfunctionalgebrasparsecs_lu from "../../../../lib/function/algebra/sparse/cs_lu";
import * as libfunctionalgebrasparsecs_sqr from "../../../../lib/function/algebra/sparse/cs_sqr";
var approx = toolsapprox;
var market = toolsmatrixmarket;
var math = index;
index.import(libfunctionalgebrasparsecs_permute);
index.import(libfunctionalgebrasparsecs_lu);
index.import(libfunctionalgebrasparsecs_sqr);

var cs_permute = index.sparse.cs_permute;
var cs_lu = index.sparse.cs_lu;
var cs_sqr = index.sparse.cs_sqr;

describe('cs_lu', function () {

  it('should decompose matrix, 2 x 2, no symbolic ordering and analysis, partial pivoting', function () {
    
    var m = index.sparse([[2, 1], [1, 4]]);
    
    // partial pivoting
    var r = cs_lu(m, null, 1);

    // L
    assert.deepEqual(r.L.valueOf(), [[1, 0], [0.5, 1]]);
    // U
    assert.deepEqual(r.U.valueOf(), [[2, 1], [0, 3.5]]);
    // P
    assert.deepEqual(r.pinv, [0, 1]);
    // verify
    toolsapprox.deepEqual(cs_permute(m, r.pinv, null, true), index.multiply(r.L, r.U));
  });
  
  it('should decompose matrix, 4 x 4, natural ordering (order=0), partial pivoting', function () {

    var m = index.sparse(
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
    toolsapprox.deepEqual(cs_permute(m, r.pinv, s.q, true).valueOf(), index.multiply(r.L, r.U).valueOf());
  });

  it('should decompose matrix, 4 x 4, amd(A+A\') (order=1), partial pivoting', function () {

    var m = index.sparse(
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
    toolsapprox.deepEqual(cs_permute(m, r.pinv, s.q, true).valueOf(), index.multiply(r.L, r.U).valueOf());
  });

  it('should decompose matrix, 4 x 4, amd(A\'*A) (order=2), partial pivoting', function () {

    var m = index.sparse(
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
    toolsapprox.deepEqual(cs_permute(m, r.pinv, s.q, true).valueOf(), index.multiply(r.L, r.U).valueOf());
  });

  it('should decompose matrix, 4 x 4, amd(A\'*A) (order=3), partial pivoting', function () {

    var m = index.sparse(
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
    toolsapprox.deepEqual(cs_permute(m, r.pinv, s.q, true).valueOf(), index.multiply(r.L, r.U).valueOf());
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
        toolsapprox.deepEqual(cs_permute(m, r.pinv, s.q, true).valueOf(), index.multiply(r.L, r.U).valueOf());

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
        toolsapprox.deepEqual(cs_permute(m, r.pinv, s.q, true).valueOf(), index.multiply(r.L, r.U).valueOf());

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
        toolsapprox.deepEqual(cs_permute(m, r.pinv, s.q, true).valueOf(), index.multiply(r.L, r.U).valueOf());

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
        toolsapprox.deepEqual(cs_permute(m, r.pinv, s.q, true).valueOf(), index.multiply(r.L, r.U).valueOf());

        // indicate test has completed
        done();
      })
      .fail(function (error) {
        // indicate test has completed
        done(error);
      });
  });
});
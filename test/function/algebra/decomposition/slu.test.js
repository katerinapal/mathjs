import { approx as approxjs } from "../../../../tools/approx";
import { math as indexjs } from "../../../../index";
import { market as matrixmarketjs, import as matrixmarketjs_import } from "../../../../tools/matrixmarket";
var approx = approxjs,
    math = indexjs,
    market = matrixmarketjs;

describe('slu', function () {

  it('should decompose matrix, 4 x 4, natural ordering (order=0), partial pivoting', function () {

    var m = indexjs.sparse(
      [
        [4.5,   0, 3.2,   0],
        [3.1, 2.9,   0, 0.9],
        [0,   1.7,   3,   0],
        [3.5, 0.4,   0,   1]
      ]);

    // partial pivoting
    var r = indexjs.slu(m, 0, 1);

    // verify M[p,q]=L*U
    approxjs.deepEqual(_permute(m, r.p, r.q).valueOf(), indexjs.multiply(r.L, r.U).valueOf());
  });

  it('should decompose matrix, 4 x 4, amd(A+A\') (order=1)', function () {

    var m = indexjs.sparse(
      [
        [4.5,   0, 3.2,   0],
        [3.1, 2.9,   0, 0.9],
        [0,   1.7,   3,   0],
        [3.5, 0.4,   0,   1]
      ]);

    // partial pivoting
    var r = indexjs.slu(m, 1, 1);

    // verify M[p,q]=L*U
    approxjs.deepEqual(_permute(m, r.p, r.q).valueOf(), indexjs.multiply(r.L, r.U).valueOf());
  });

  it('should decompose matrix, 4 x 4, amd(A\'*A) (order=2), partial pivoting', function () {

    var m = indexjs.sparse(
      [
        [4.5,   0, 3.2,   0],
        [3.1, 2.9,   0, 0.9],
        [0,   1.7,   3,   0],
        [3.5, 0.4,   0,   1]
      ]);

    // partial pivoting
    var r = indexjs.slu(m, 2, 1);

    // verify M[p,q]=L*U
    approxjs.deepEqual(_permute(m, r.p, r.q).valueOf(), indexjs.multiply(r.L, r.U).valueOf());
  });

  it('should decompose matrix, 4 x 4, amd(A\'*A) (order=3), partial pivoting', function () {

    var m = indexjs.sparse(
      [
        [4.5,   0, 3.2,   0],
        [3.1, 2.9,   0, 0.9],
        [0,   1.7,   3,   0],
        [3.5, 0.4,   0,   1]
      ]);

    // partial pivoting
    var r = indexjs.slu(m, 3, 1);

    // verify M[p,q]=L*U
    approxjs.deepEqual(_permute(m, r.p, r.q).valueOf(), indexjs.multiply(r.L, r.U).valueOf());
  });

  it('should decompose matrix, 48 x 48, natural ordering (order=0), full pivoting, matrix market', function (done) {
    // import matrix
    matrixmarketjs_import('tools/matrices/bcsstk01.tar.gz', ['bcsstk01/bcsstk01.mtx'])
      .then(function (matrices) {
        // matrix
        var m = matrices[0];

        // full pivoting
        var r = indexjs.slu(m, 0, 0.001);

        // verify M[p,q]=L*U
        approxjs.deepEqual(_permute(m, r.p, r.q).valueOf(), indexjs.multiply(r.L, r.U).valueOf());

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

        // full pivoting
        var r = indexjs.slu(m, 1, 0.001);

        // verify M[p,q]=L*U
        approxjs.deepEqual(_permute(m, r.p, r.q).valueOf(), indexjs.multiply(r.L, r.U).valueOf());

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

        // full pivoting
        var r = indexjs.slu(m, 2, 0.001);

        // verify M[p,q]=L*U
        approxjs.deepEqual(_permute(m, r.p, r.q).valueOf(), indexjs.multiply(r.L, r.U).valueOf());

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

        // full pivoting
        var r = indexjs.slu(m, 3, 0.001);

        // verify M[p,q]=L*U
        approxjs.deepEqual(_permute(m, r.p, r.q).valueOf(), indexjs.multiply(r.L, r.U).valueOf());

        // indicate test has completed
        done();
      })
      .fail(function (error) {
        // indicate test has completed
        done(error);
      });
  });
  
  /**
   * C = A(p,q) where p is the row permutation vector and q the column permutation vector.
   */
  var _permute = function (A, pinv, q) {
    // matrix arrays
    var values = A._values;
    var index = A._index;
    var ptr = A._ptr;
    var size = A._size;
    // columns
    var n = size[1];
    // c arrays
    var cvalues = [];
    var cindex = [];
    var cptr = [];
    // loop columns
    for (var k = 0 ; k < n ; k++) {
      cptr[k] = cindex.length;
      // column in C
      var j = q ? (q[k]) : k;
      // values in column j
      for (var t = ptr[j]; t < ptr[j + 1]; t++) {
        cvalues.push(values[t]);
        cindex.push(pinv ? (pinv[index[t]]) : index[t]);
      }
    }
    cptr[n] = cindex.length;
    // return matrix
    return new indexjs.type.SparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: size,
      datatype: A._datatype
    });
  };
});
"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../../tools/approx");

var _matrixmarket = require("../../../../tools/matrixmarket");

var _index = require("../../../../index");

var _cs_permute = require("../../../../lib/function/algebra/sparse/cs_permute");

var libfunctionalgebrasparsecs_permute_obj = _interopRequireWildcard(_cs_permute);

var _cs_lu = require("../../../../lib/function/algebra/sparse/cs_lu");

var libfunctionalgebrasparsecs_lu_obj = _interopRequireWildcard(_cs_lu);

var _cs_sqr = require("../../../../lib/function/algebra/sparse/cs_sqr");

var libfunctionalgebrasparsecs_sqr_obj = _interopRequireWildcard(_cs_sqr);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_index.indexjs.import(libfunctionalgebrasparsecs_permute_obj);
_index.indexjs.import(libfunctionalgebrasparsecs_lu_obj);
_index.indexjs.import(libfunctionalgebrasparsecs_sqr_obj);

var cs_permute = _index.indexjs.sparse.cs_permute;
var cs_lu = _index.indexjs.sparse.cs_lu;
var cs_sqr = _index.indexjs.sparse.cs_sqr;

describe('cs_lu', function () {

  it('should decompose matrix, 2 x 2, no symbolic ordering and analysis, partial pivoting', function () {

    var m = _index.indexjs.sparse([[2, 1], [1, 4]]);

    // partial pivoting
    var r = cs_lu(m, null, 1);

    // L
    _assert2.default.deepEqual(r.L.valueOf(), [[1, 0], [0.5, 1]]);
    // U
    _assert2.default.deepEqual(r.U.valueOf(), [[2, 1], [0, 3.5]]);
    // P
    _assert2.default.deepEqual(r.pinv, [0, 1]);
    // verify
    (0, _approx.deepEqual)(cs_permute(m, r.pinv, null, true), _index.indexjs.multiply(r.L, r.U));
  });

  it('should decompose matrix, 4 x 4, natural ordering (order=0), partial pivoting', function () {

    var m = _index.indexjs.sparse([[4.5, 0, 3.2, 0], [3.1, 2.9, 0, 0.9], [0, 1.7, 3, 0], [3.5, 0.4, 0, 1]]);

    // symbolic ordering and analysis, order = 0
    var s = cs_sqr(0, m, false);

    // partial pivoting
    var r = cs_lu(m, s, 1);

    // verify
    (0, _approx.deepEqual)(cs_permute(m, r.pinv, s.q, true).valueOf(), _index.indexjs.multiply(r.L, r.U).valueOf());
  });

  it('should decompose matrix, 4 x 4, amd(A+A\') (order=1), partial pivoting', function () {

    var m = _index.indexjs.sparse([[4.5, 0, 3.2, 0], [3.1, 2.9, 0, 0.9], [0, 1.7, 3, 0], [3.5, 0.4, 0, 1]]);

    // symbolic ordering and analysis, order = 1
    var s = cs_sqr(1, m, false);

    // partial pivoting
    var r = cs_lu(m, s, 1);

    // verify
    (0, _approx.deepEqual)(cs_permute(m, r.pinv, s.q, true).valueOf(), _index.indexjs.multiply(r.L, r.U).valueOf());
  });

  it('should decompose matrix, 4 x 4, amd(A\'*A) (order=2), partial pivoting', function () {

    var m = _index.indexjs.sparse([[4.5, 0, 3.2, 0], [3.1, 2.9, 0, 0.9], [0, 1.7, 3, 0], [3.5, 0.4, 0, 1]]);

    // symbolic ordering and analysis, order = 2
    var s = cs_sqr(2, m, false);

    // partial pivoting
    var r = cs_lu(m, s, 1);

    // verify
    (0, _approx.deepEqual)(cs_permute(m, r.pinv, s.q, true).valueOf(), _index.indexjs.multiply(r.L, r.U).valueOf());
  });

  it('should decompose matrix, 4 x 4, amd(A\'*A) (order=3), partial pivoting', function () {

    var m = _index.indexjs.sparse([[4.5, 0, 3.2, 0], [3.1, 2.9, 0, 0.9], [0, 1.7, 3, 0], [3.5, 0.4, 0, 1]]);

    // symbolic ordering and analysis, order = 3
    var s = cs_sqr(3, m, false);

    // partial pivoting
    var r = cs_lu(m, s, 1);

    // verify
    (0, _approx.deepEqual)(cs_permute(m, r.pinv, s.q, true).valueOf(), _index.indexjs.multiply(r.L, r.U).valueOf());
  });

  it('should decompose matrix, 48 x 48, natural ordering (order=0), full pivoting, matrix market', function (done) {
    // import matrix
    _matrixmarket.matrixmarketjs.import('tools/matrices/bcsstk01.tar.gz', ['bcsstk01/bcsstk01.mtx']).then(function (matrices) {
      // matrix
      var m = matrices[0];

      // symbolic ordering and analysis, order = 0
      var s = cs_sqr(0, m, false);

      // full pivoting
      var r = cs_lu(m, s, 0.001);

      // verify
      (0, _approx.deepEqual)(cs_permute(m, r.pinv, s.q, true).valueOf(), _index.indexjs.multiply(r.L, r.U).valueOf());

      // indicate test has completed
      done();
    }).fail(function (error) {
      // indicate test has completed
      done(error);
    });
  });

  it('should decompose matrix, 48 x 48, amd(A+A\') (order=1), full pivoting, matrix market', function (done) {
    // import matrix
    _matrixmarket.matrixmarketjs.import('tools/matrices/bcsstk01.tar.gz', ['bcsstk01/bcsstk01.mtx']).then(function (matrices) {
      // matrix
      var m = matrices[0];

      // symbolic ordering and analysis, order = 1
      var s = cs_sqr(1, m, false);

      // full pivoting
      var r = cs_lu(m, s, 0.001);

      // verify
      (0, _approx.deepEqual)(cs_permute(m, r.pinv, s.q, true).valueOf(), _index.indexjs.multiply(r.L, r.U).valueOf());

      // indicate test has completed
      done();
    }).fail(function (error) {
      // indicate test has completed
      done(error);
    });
  });

  it('should decompose matrix, 48 x 48, amd(A\'*A) (order=2), full pivoting, matrix market', function (done) {
    // import matrix
    _matrixmarket.matrixmarketjs.import('tools/matrices/bcsstk01.tar.gz', ['bcsstk01/bcsstk01.mtx']).then(function (matrices) {
      // matrix
      var m = matrices[0];

      // symbolic ordering and analysis, order = 2
      var s = cs_sqr(2, m, false);

      // full pivoting
      var r = cs_lu(m, s, 0.001);

      // verify
      (0, _approx.deepEqual)(cs_permute(m, r.pinv, s.q, true).valueOf(), _index.indexjs.multiply(r.L, r.U).valueOf());

      // indicate test has completed
      done();
    }).fail(function (error) {
      // indicate test has completed
      done(error);
    });
  });

  it('should decompose matrix, 48 x 48, amd(A\'*A) (order=3), full pivoting, matrix market', function (done) {
    // import matrix
    _matrixmarket.matrixmarketjs.import('tools/matrices/bcsstk01.tar.gz', ['bcsstk01/bcsstk01.mtx']).then(function (matrices) {
      // matrix
      var m = matrices[0];

      // symbolic ordering and analysis, order = 3
      var s = cs_sqr(3, m, false);

      // full pivoting
      var r = cs_lu(m, s, 0.001);

      // verify
      (0, _approx.deepEqual)(cs_permute(m, r.pinv, s.q, true).valueOf(), _index.indexjs.multiply(r.L, r.U).valueOf());

      // indicate test has completed
      done();
    }).fail(function (error) {
      // indicate test has completed
      done(error);
    });
  });
});

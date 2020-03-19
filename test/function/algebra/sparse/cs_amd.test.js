"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../../tools/approx");

var _cs_amd = require("../../../../lib/function/algebra/sparse/cs_amd");

var libfunctionalgebrasparsecs_amd_obj = _interopRequireWildcard(_cs_amd);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

math.import(libfunctionalgebrasparsecs_amd_obj);

var cs_amd = math.sparse.cs_amd;

describe('cs_amd', function () {

  it('should approximate minimum degree ordering, 48 x 48, natural ordering (order=0), matrix market', function (done) {
    // import matrix
    market.import('tools/matrices/bcsstk01.tar.gz', ['bcsstk01/bcsstk01.mtx']).then(function (matrices) {
      // matrix
      var m = matrices[0];

      // symbolic ordering and analysis, order = 0
      var q = cs_amd(0, m);

      // verify
      (0, _assert2.default)(q === null);

      // indicate test has completed
      done();
    }).fail(function (error) {
      // indicate test has completed
      done(error);
    });
  });

  it('should approximate minimum degree ordering, 48 x 48, amd(A+A\') (order=1), matrix market', function (done) {
    // import matrix
    market.import('tools/matrices/bcsstk01.tar.gz', ['bcsstk01/bcsstk01.mtx']).then(function (matrices) {
      // matrix
      var m = matrices[0];

      // symbolic ordering and analysis, order = 1
      var q = cs_amd(1, m);

      // verify
      (0, _approx.deepEqual)(q, [10, 28, 29, 24, 0, 11, 30, 6, 23, 22, 40, 46, 42, 18, 4, 16, 34, 5, 9, 39, 21, 44, 45, 43, 15, 25, 26, 27, 3, 33, 41, 19, 20, 2, 38, 32, 1, 14, 8, 13, 37, 31, 12, 36, 17, 47, 35, 7]);

      // indicate test has completed
      done();
    }).fail(function (error) {
      // indicate test has completed
      done(error);
    });
  });

  it('should approximate minimum degree ordering, 48 x 48, amd(A\'*A) (order=2), matrix market', function (done) {
    // import matrix
    market.import('tools/matrices/bcsstk01.tar.gz', ['bcsstk01/bcsstk01.mtx']).then(function (matrices) {
      // matrix
      var m = matrices[0];

      // symbolic ordering and analysis, order = 2
      var q = cs_amd(2, m, false);

      // verify
      (0, _approx.deepEqual)(q, [26, 27, 25, 44, 9, 15, 21, 33, 39, 43, 45, 3, 29, 24, 28, 47, 6, 18, 36, 0, 1, 4, 20, 2, 10, 11, 12, 8, 14, 16, 7, 13, 17, 23, 30, 34, 38, 32, 31, 41, 35, 22, 19, 37, 40, 42, 46, 5]);

      // indicate test has completed
      done();
    }).fail(function (error) {
      // indicate test has completed
      done(error);
    });
  });

  it('should approximate minimum degree ordering, 48 x 48, amd(A\'*A) (order=3), matrix market', function (done) {
    // import matrix
    market.import('tools/matrices/bcsstk01.tar.gz', ['bcsstk01/bcsstk01.mtx']).then(function (matrices) {
      // matrix
      var m = matrices[0];

      // symbolic ordering and analysis, order = 3
      var q = cs_amd(3, m, false);

      // verify
      (0, _approx.deepEqual)(q, [26, 27, 25, 44, 9, 15, 21, 33, 39, 43, 45, 3, 29, 24, 28, 47, 6, 18, 36, 0, 1, 4, 20, 2, 10, 11, 12, 8, 14, 16, 7, 13, 17, 23, 30, 34, 38, 32, 31, 41, 35, 22, 19, 37, 40, 42, 46, 5]);

      // indicate test has completed
      done();
    }).fail(function (error) {
      // indicate test has completed
      done(error);
    });
  });
});

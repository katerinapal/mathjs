"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = {};

describe('distance', function () {
  it('should calculate the distance of two 2D points', function () {
    _assert2.default.equal(_index.indexjs.distance([0, 0], [10, 10]), 14.142135623730951);
    _assert2.default.equal(_index.indexjs.distance(_index.indexjs.matrix([0, 0]), _index.indexjs.matrix([10, 10])), 14.142135623730951);
    _assert2.default.equal(_index.indexjs.distance(_index.indexjs.matrix([0, 0, 0]), _index.indexjs.matrix([10, 10, 0])), 14.142135623730951);
    _assert2.default.equal(_index.indexjs.distance({ pointOneX: 0, pointOneY: 0 }, { pointTwoX: 10, pointTwoY: 10 }), 14.142135623730951);
  });

  it('should calculate distance between two 3d points', function () {
    _assert2.default.equal(_index.indexjs.distance([4, 5, 8], [2, 7, 9]), 3);
    _assert2.default.equal(_index.indexjs.distance(_index.indexjs.matrix([0, 0, 0]), _index.indexjs.matrix([10, 10, 0])), 14.142135623730951);
    _assert2.default.equal(_index.indexjs.distance(_index.indexjs.matrix([0.31, 0.2, -0.21]), [0.4234, -0.212, -0.2342]), 0.42800607472324503);
    _assert2.default.equal(_index.indexjs.distance([67435, 654667, 3545567], [53467, 34567, 654356]), 2956995.1236931384);
    _assert2.default.equal(_index.indexjs.distance([-21, -230, -2141], _index.indexjs.matrix([-1234, -3122, -1242])), 3262.396971553278);
    _assert2.default.equal(_index.indexjs.distance({ pointOneX: 4, pointOneY: 5, pointOneZ: 8 }, { pointTwoX: 2, pointTwoY: 7, pointTwoZ: 9 }), 3);
  });

  it('should calculate distance for inputs passed as objects', function () {
    _assert2.default.deepEqual(_index.indexjs.distance({ pointX: 1, pointY: 4 }, { lineOnePtX: 6, lineOnePtY: 3 }, { lineTwoPtX: 2, lineTwoPtY: 8 }), 2.720549372624744);
    _assert2.default.deepEqual(_index.indexjs.distance({ pointX: 10, pointY: 10 }, { xCoeffLine: 8, yCoeffLine: 1, constant: 3 }), 11.535230316796387);
    _assert2.default.equal(_index.indexjs.distance({ pointOneX: 0, pointOneY: 0 }, { pointTwoX: 10, pointTwoY: 10 }), 14.142135623730951);
    _assert2.default.throws(function () {
      _index.indexjs.distance({ pointX: 1, pointY: 4 }, { lineOnePtX: 'l', lineOnePtY: 3 }, { lineTwoPtX: 2, lineTwoPtY: 8 });
    }, TypeError);
    _assert2.default.equal(_index.indexjs.distance({ pointOneX: 4, pointOneY: 5, pointOneZ: 8 }, { pointTwoX: 2, pointTwoY: 7, pointTwoZ: 9 }), 3);
  });

  it('should calculate distance for all non-zero values', function () {
    _assert2.default.equal(_index.indexjs.distance([1, 1], [10, 10]), 12.727922061357855);
    _assert2.default.equal(_index.indexjs.distance([-1, -1], [10, 10]), 15.556349186104045);
    _assert2.default.equal(_index.indexjs.distance(_index.indexjs.matrix([-1, 8]), [5, 10]), 6.324555320336759);
    _assert2.default.equal(_index.indexjs.distance([-100, 60], [0, 500]), 451.22056690713913);
    _assert2.default.equal(_index.indexjs.distance([-100.78, 60.04], [0.3, 500.09]), 451.5098768576386);
    _assert2.default.equal(_index.indexjs.distance([74, -34, -0.5], _index.indexjs.matrix([34, 100, -4.33])), 139.89520685141431);
    _assert2.default.deepEqual(_index.indexjs.distance([1, -1, -1], [2, 2, 0.1, 1, 2, 2]), 1.3437096247164249);
  });

  it('should throw an error for incompatible parameter types', function () {
    _assert2.default.throws(function () {
      _index.indexjs.distance(0.5);
    }, TypeError);
    _assert2.default.throws(function () {
      _index.indexjs.distance('1');
    }, TypeError);
    _assert2.default.throws(function () {
      _index.indexjs.distance(["abc", "def"], [1, 3]);
    }, TypeError);
    _assert2.default.throws(function () {
      _index.indexjs.distance(['2', '3'], _index.indexjs.matrix(["a", "c"]), [1, -0.445364786543434]);
    }, TypeError);
    _assert2.default.throws(function () {
      _index.indexjs.distance({ pointX: 1, pointY: 4 }, { lineOnePtX: 'l', lineOnePtY: 3 }, { lineTwoPtX: 2, lineTwoPtY: 8 });
    }, TypeError);
    _assert2.default.throws(function () {
      _index.indexjs.distance({ wrongkeyname: 2, english: 3, pointZ: 1 }, { x0: 1, y0: 1, z0: 2, a: 5, b: 0, c: 1 });
    }, TypeError);
  });

  it('should throw an error for unsupported number of parameters', function () {
    _assert2.default.throws(function () {
      _index.indexjs.distance([0, 0]);
    }, TypeError);
    _assert2.default.throws(function () {
      _index.indexjs.distance([9, 4, 3.6]);
    }, TypeError);
    _assert2.default.throws(function () {
      _index.indexjs.distance([[1, 2, 4], _index.indexjs.matrix([1, 2]), [8, 1, 3]]);
    }, TypeError);
    _assert2.default.throws(function () {
      _index.indexjs.distance([-0.5, 4.3], [3.2, -4.654323, 3.3, 6.5, 3.4]);
    }, TypeError);
  });

  it('should calculate pairwise distance between more than two 2D points accurately', function () {
    _assert2.default.deepEqual(_index.indexjs.distance([[1, 2], [1, 2], [1, 3]]), [0, 1, 1]);
    _assert2.default.deepEqual(_index.indexjs.distance([[0, 2], [-2, 0], [0, 2]]), [2.8284271247461903, 0, 2.8284271247461903]);
    _assert2.default.deepEqual(_index.indexjs.distance([[1, 2], [2, 3], [2, 4], [3, 0]]), [1.4142135623730951, 2.23606797749979, 2.8284271247461903, 1, 3.1622776601683795, 4.123105625617661]);
  });

  it('should calculate pairwise distance between more than two 3D points accurately', function () {
    _assert2.default.deepEqual(_index.indexjs.distance([[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]]), [1, 1, 1, 1.4142135623730951, 1.4142135623730951, 1.4142135623730951]);
    _assert2.default.deepEqual(_index.indexjs.distance([[1, 2, 4], [1, 2, 6], [8, 1, 3]]), [2, 7.14142842854285, 7.681145747868608]);
    _assert2.default.deepEqual(_index.indexjs.distance([[-41, 52, 24], [61, -28, 60], [-38, 11, 53]]), [134.5362404707371, 50.309044912421065, 106.63489110042735]);
    _assert2.default.deepEqual(_index.indexjs.distance([[3.1, 5.2, 4.5], [4.1, 0.2, 6.4], [-5.8, -4.1, 3021]]), [5.441507144165116, 3016.527465480797, 3014.6193225679426]);
  });

  it('should calculate distance between a point and a line segment given by an equation in 2D accurately', function () {
    _assert2.default.deepEqual(_index.indexjs.distance([0.1123, -0.242], [0.1316, -0.2421, 0.122135]), 0.7094821347343443);
    _assert2.default.deepEqual(_index.indexjs.distance([10, 10], [8, 1, 3]), 11.535230316796387);
    _assert2.default.deepEqual(_index.indexjs.distance([12.5, -0.5], [8.5, -1, 3.75]), 12.91095785619739);
    _assert2.default.deepEqual(_index.indexjs.distance([-34510, -1032], [8996, -10599, 34653]), 21542.094604263482);
    _assert2.default.deepEqual(_index.indexjs.distance({ pointX: 10, pointY: 10 }, { xCoeffLine: 8, yCoeffLine: 1, constant: 3 }), 11.535230316796387);
  });

  it('should calculate distance between a point and a line segment given by two points in 2D accurately', function () {
    _assert2.default.deepEqual(_index.indexjs.distance(_index.indexjs.matrix([10, 10]), _index.indexjs.matrix([2, 3]), _index.indexjs.matrix([-8, 0])), 8.759953130362847);
    _assert2.default.deepEqual(_index.indexjs.distance([0.23, -0.1240], [-0.232, 13.292], [-0.34, 0.346]), 10.658908662088363);
    _assert2.default.deepEqual(_index.indexjs.distance([-10, 0.54], [38, 12.8], [94.33, -239]), 10.012171799590002);
    _assert2.default.deepEqual(_index.indexjs.distance({ pointX: 1, pointY: 4 }, { lineOnePtX: 6, lineOnePtY: 3 }, { lineTwoPtX: 2, lineTwoPtY: 8 }), 2.720549372624744);
  });

  it('should calculate distance between point and line segment(with parametric co-ordinates) in 3D accurately', function () {
    _assert2.default.deepEqual(_index.indexjs.distance([2, 3, 1], [1, 1, 2, 5, 0, 1]), 2.3204774044612857);
    _assert2.default.deepEqual(_index.indexjs.distance(_index.indexjs.matrix([1, -1, -1]), _index.indexjs.matrix([2, 2, 0, 1, 2, 2])), 1.414213562373095);
    _assert2.default.deepEqual(_index.indexjs.distance([-341, 12, 84.34], [-3.2, 212, 1.240, -51241, 22.2, -4652]), 229.9871046141146);
    _assert2.default.deepEqual(_index.indexjs.distance({ pointX: 2, pointY: 3, pointZ: 1 }, { x0: 1, y0: 1, z0: 2, a: 5, b: 0, c: 1 }), 2.3204774044612857);
  });
});

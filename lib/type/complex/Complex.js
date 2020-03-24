"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.math = exports.factory = exports.path = exports.name = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _complex = require("complex.js");

var _complex2 = _interopRequireDefault(_complex);

var _number = require("../../utils/number");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function factory(type, config, load, typed, math) {

  /**
   * Attach type information
   */
  _complex2.default.prototype.type = 'Complex';
  _complex2.default.prototype.isComplex = true;

  /**
   * Get a JSON representation of the complex number
   * @returns {Object} Returns a JSON object structured as:
   *                   `{"mathjs": "Complex", "re": 2, "im": 3}`
   */
  _complex2.default.prototype.toJSON = function () {
    return {
      mathjs: 'Complex',
      re: this.re,
      im: this.im
    };
  };

  /*
   * Return the value of the complex number in polar notation
   * The angle phi will be set in the interval of [-pi, pi].
   * @return {{r: number, phi: number}} Returns and object with properties r and phi.
   */
  _complex2.default.prototype.toPolar = function () {
    return {
      r: this.abs(),
      phi: this.arg()
    };
  };

  /**
   * Get a string representation of the complex number,
   * with optional formatting options.
   * @param {Object | number | Function} [options]  Formatting options. See
   *                                                lib/utils/number:format for a
   *                                                description of the available
   *                                                options.
   * @return {string} str
   */
  _complex2.default.prototype.format = function (options) {
    var str = '';
    var im = this.im;
    var re = this.re;
    var strRe = (0, _number.format)(this.re, options);
    var strIm = (0, _number.format)(this.im, options);

    // round either re or im when smaller than the configured precision
    var precision = isNumber(options) ? options : options ? options.precision : null;
    if (precision !== null) {
      var epsilon = Math.pow(10, -precision);
      if (Math.abs(re / im) < epsilon) {
        re = 0;
      }
      if (Math.abs(im / re) < epsilon) {
        im = 0;
      }
    }

    if (im == 0) {
      // real value
      str = strRe;
    } else if (re == 0) {
      // purely complex value
      if (im == 1) {
        str = 'i';
      } else if (im == -1) {
        str = '-i';
      } else {
        str = strIm + 'i';
      }
    } else {
      // complex value
      if (im > 0) {
        if (im == 1) {
          str = strRe + ' + i';
        } else {
          str = strRe + ' + ' + strIm + 'i';
        }
      } else {
        if (im == -1) {
          str = strRe + ' - i';
        } else {
          str = strRe + ' - ' + strIm.substring(1) + 'i';
        }
      }
    }
    return str;
  };

  /**
   * Create a complex number from polar coordinates
   *
   * Usage:
   *
   *     Complex.fromPolar(r: number, phi: number) : Complex
   *     Complex.fromPolar({r: number, phi: number}) : Complex
   *
   * @param {*} args...
   * @return {Complex}
   */
  _complex2.default.fromPolar = function (args) {
    switch (arguments.length) {
      case 1:
        var arg = arguments[0];
        if ((typeof arg === "undefined" ? "undefined" : _typeof(arg)) === 'object') {
          return (0, _complex2.default)(arg);
        }
        throw new TypeError('Input has to be an object with r and phi keys.');

      case 2:
        var r = arguments[0],
            phi = arguments[1];
        if (isNumber(r)) {
          if (phi && phi.isUnit && phi.hasBase('ANGLE')) {
            // convert unit to a number in radians
            phi = phi.toNumber('rad');
          }

          if (isNumber(phi)) {
            return new _complex2.default({ r: r, phi: phi });
          }

          throw new TypeError('Phi is not a number nor an angle unit.');
        } else {
          throw new TypeError('Radius r is not a number.');
        }

      default:
        throw new SyntaxError('Wrong number of arguments in function fromPolar');
    }
  };

  _complex2.default.prototype.valueOf = _complex2.default.prototype.toString;

  /**
   * Create a Complex number from a JSON object
   * @param {Object} json  A JSON Object structured as
   *                       {"mathjs": "Complex", "re": 2, "im": 3}
   *                       All properties are optional, default values
   *                       for `re` and `im` are 0.
   * @return {Complex} Returns a new Complex number
   */
  _complex2.default.fromJSON = function (json) {
    return new _complex2.default(json);
  };

  // apply the current epsilon
  _complex2.default.EPSILON = config.epsilon;

  // listen for changed in the configuration, automatically apply changed epsilon
  math.on('config', function (curr, prev) {
    if (curr.epsilon !== prev.epsilon) {
      _complex2.default.EPSILON = curr.epsilon;
    }
  });

  return _complex2.default;
}

var name_name = 'Complex';
var path_path = 'type';
var factory_factory = factory;
var math_math = true;
exports.name = name_name;
exports.path = path_path;
exports.factory = factory_factory;
exports.math = math_math;

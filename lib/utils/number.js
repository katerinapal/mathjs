'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nearlyEqual = exports.DBL_EPSILON = exports.digits = exports.toPrecision = exports.toFixed = exports.toEngineering = exports.toExponential = exports.format = exports.sign = exports.isInteger = exports.isNumber = undefined;

var _NumberFormatter = require('./NumberFormatter');

'use strict';

var isNumber_isNumber = function isNumber_isNumber(value) {
  return typeof value === 'number';
};

var isInteger_isInteger = function isInteger_isInteger(value) {
  return isFinite(value) ? value == Math.round(value) : false;
  // Note: we use ==, not ===, as we can have Booleans as well
};

var sign_sign = Math.sign || function (x) {
  if (x > 0) {
    return 1;
  } else if (x < 0) {
    return -1;
  } else {
    return 0;
  }
};

var format_format = function format_format(value, options) {
  if (typeof options === 'function') {
    // handle format(value, fn)
    return options(value);
  }

  // handle special cases
  if (value === Infinity) {
    return 'Infinity';
  } else if (value === -Infinity) {
    return '-Infinity';
  } else if (isNaN(value)) {
    return 'NaN';
  }

  // default values for options
  var notation = 'auto';
  var precision = undefined;

  if (options) {
    // determine notation from options
    if (options.notation) {
      notation = options.notation;
    }

    // determine precision from options
    if (isNumber_isNumber(options)) {
      precision = options;
    } else if (options.precision) {
      precision = options.precision;
    }
  }

  // handle the various notations
  switch (notation) {
    case 'fixed':
      return toFixed_toFixed(value, precision);

    case 'exponential':
      return toExponential_toExponential(value, precision);

    case 'engineering':
      return toEngineering_toEngineering(value, precision);

    case 'auto':
      return toPrecision_toPrecision(value, precision, options && options.exponential)

      // remove trailing zeros after the decimal point
      .replace(/((\.\d*?)(0+))($|e)/, function () {
        var digits = arguments[2];
        var e = arguments[4];
        return digits !== '.' ? digits + e : e;
      });

    default:
      throw new Error('Unknown notation "' + notation + '". ' + 'Choose "auto", "exponential", or "fixed".');
  }
};

var toExponential_toExponential = function toExponential_toExponential(value, precision) {
  return new _NumberFormatter.NumberFormatter(value).toExponential(precision);
};

var toEngineering_toEngineering = function toEngineering_toEngineering(value, precision) {
  return new _NumberFormatter.NumberFormatter(value).toEngineering(precision);
};

var toFixed_toFixed = function toFixed_toFixed(value, precision) {
  return new _NumberFormatter.NumberFormatter(value).toFixed(precision);
};

var toPrecision_toPrecision = function toPrecision_toPrecision(value, precision, options) {
  return new _NumberFormatter.NumberFormatter(value).toPrecision(precision, options);
};

var digits_digits = function digits_digits(value) {
  return value.toExponential().replace(/e.*$/, '') // remove exponential notation
  .replace(/^0\.?0*|\./, '') // remove decimal point and leading zeros
  .length;
};

var DBL_EPSILON_DBL_EPSILON = Number.EPSILON || 2.2204460492503130808472633361816E-16;

var nearlyEqual_nearlyEqual = function nearlyEqual_nearlyEqual(x, y, epsilon) {
  // if epsilon is null or undefined, test whether x and y are exactly equal
  if (epsilon == null) {
    return x == y;
  }

  // use "==" operator, handles infinities
  if (x == y) {
    return true;
  }

  // NaN
  if (isNaN(x) || isNaN(y)) {
    return false;
  }

  // at this point x and y should be finite
  if (isFinite(x) && isFinite(y)) {
    // check numbers are very close, needed when comparing numbers near zero
    var diff = Math.abs(x - y);
    if (diff < DBL_EPSILON_DBL_EPSILON) {
      return true;
    } else {
      // use relative error
      return diff <= Math.max(Math.abs(x), Math.abs(y)) * epsilon;
    }
  }

  // Infinite and Number or negative Infinite and positive Infinite cases
  return false;
};

exports.isNumber = isNumber_isNumber;
exports.isInteger = isInteger_isInteger;
exports.sign = sign_sign;
exports.format = format_format;
exports.toExponential = toExponential_toExponential;
exports.toEngineering = toEngineering_toEngineering;
exports.toFixed = toFixed_toFixed;
exports.toPrecision = toPrecision_toPrecision;
exports.digits = digits_digits;
exports.DBL_EPSILON = DBL_EPSILON_DBL_EPSILON;
exports.nearlyEqual = nearlyEqual_nearlyEqual;

import { NumberFormatter as NumberFormatter_NumberFormatterjs } from "./NumberFormatter";
'use strict';

var isNumber_isNumber = function(value) {
  return typeof value === 'number';
};

var isInteger_isInteger = function(value) {
  return isFinite(value)
      ? (value == Math.round(value))
      : false;
  // Note: we use ==, not ===, as we can have Booleans as well
};

var sign_sign = Math.sign || function(x) {
  if (x > 0) {
    return 1;
  }
  else if (x < 0) {
    return -1;
  }
  else {
    return 0;
  }
};

var format_format = function(value, options) {
  if (typeof options === 'function') {
    // handle format(value, fn)
    return options(value);
  }

  // handle special cases
  if (value === Infinity) {
    return 'Infinity';
  }
  else if (value === -Infinity) {
    return '-Infinity';
  }
  else if (isNaN(value)) {
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
    }
    else if (options.precision) {
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
            return (digits !== '.') ? digits + e : e;
          });

    default:
      throw new Error('Unknown notation "' + notation + '". ' +
          'Choose "auto", "exponential", or "fixed".');
  }
};

var toExponential_toExponential = function(value, precision) {
  return new NumberFormatter_NumberFormatterjs(value).toExponential(precision);
};

var toEngineering_toEngineering = function(value, precision) {
  return new NumberFormatter_NumberFormatterjs(value).toEngineering(precision);
};

var toFixed_toFixed = function(value, precision) {
  return new NumberFormatter_NumberFormatterjs(value).toFixed(precision);
};

var toPrecision_toPrecision = function(value, precision, options) {
  return new NumberFormatter_NumberFormatterjs(value).toPrecision(precision, options);
};

var digits_digits = function(value) {
  return value
      .toExponential()
      .replace(/e.*$/, '')          // remove exponential notation
      .replace( /^0\.?0*|\./, '')   // remove decimal point and leading zeros
      .length
};

var DBL_EPSILON_DBL_EPSILON = Number.EPSILON || 2.2204460492503130808472633361816E-16;

var nearlyEqual_nearlyEqual = function(x, y, epsilon) {
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
  if(isFinite(x) && isFinite(y)) {
    // check numbers are very close, needed when comparing numbers near zero
    var diff = Math.abs(x - y);
    if (diff < DBL_EPSILON_DBL_EPSILON) {
      return true;
    }
    else {
      // use relative error
      return diff <= Math.max(Math.abs(x), Math.abs(y)) * epsilon;
    }
  }

  // Infinite and Number or negative Infinite and positive Infinite cases
  return false;
};

export { isNumber_isNumber as isNumber };
export { isInteger_isInteger as isInteger };
export { sign_sign as sign };
export { format_format as format };
export { toExponential_toExponential as toExponential };
export { toEngineering_toEngineering as toEngineering };
export { toFixed_toFixed as toFixed };
export { toPrecision_toPrecision as toPrecision };
export { digits_digits as digits };
export { DBL_EPSILON_DBL_EPSILON as DBL_EPSILON };
export { nearlyEqual_nearlyEqual as nearlyEqual };

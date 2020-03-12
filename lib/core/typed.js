"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typedFunction = require("typed-function");

var _typedFunction2 = _interopRequireDefault(_typedFunction);

var _number = require("./../utils/number");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// returns a new instance of typed-function
var _createTyped = function createTyped() {
  // initially, return the original instance of typed-function
  // consecutively, return a new instance from typed.create.
  _createTyped = _typedFunction2.default.create;
  return _typedFunction2.default;
};

var create_exportedObj = function create(type) {
  // TODO: typed-function must be able to silently ignore signatures with unknown data types

  // get a new instance of typed-function
  var typed = _createTyped();

  // define all types. The order of the types determines in which order function
  // arguments are type-checked (so for performance it's important to put the
  // most used types first).
  typed.types = [{ name: 'number', test: function test(x) {
      return typeof x === 'number';
    } }, { name: 'Complex', test: function test(x) {
      return x && x.isComplex;
    } }, { name: 'BigNumber', test: function test(x) {
      return x && x.isBigNumber;
    } }, { name: 'Fraction', test: function test(x) {
      return x && x.isFraction;
    } }, { name: 'Unit', test: function test(x) {
      return x && x.isUnit;
    } }, { name: 'string', test: function test(x) {
      return typeof x === 'string';
    } }, { name: 'Array', test: Array.isArray }, { name: 'Matrix', test: function test(x) {
      return x && x.isMatrix;
    } }, { name: 'DenseMatrix', test: function test(x) {
      return x && x.isDenseMatrix;
    } }, { name: 'SparseMatrix', test: function test(x) {
      return x && x.isSparseMatrix;
    } }, { name: 'ImmutableDenseMatrix', test: function test(x) {
      return x && x.isImmutableDenseMatrix;
    } }, { name: 'Range', test: function test(x) {
      return x && x.isRange;
    } }, { name: 'Index', test: function test(x) {
      return x && x.isIndex;
    } }, { name: 'boolean', test: function test(x) {
      return typeof x === 'boolean';
    } }, { name: 'ResultSet', test: function test(x) {
      return x && x.isResultSet;
    } }, { name: 'Help', test: function test(x) {
      return x && x.isHelp;
    } }, { name: 'function', test: function test(x) {
      return typeof x === 'function';
    } }, { name: 'Date', test: function test(x) {
      return x instanceof Date;
    } }, { name: 'RegExp', test: function test(x) {
      return x instanceof RegExp;
    } }, { name: 'Object', test: function test(x) {
      return (typeof x === "undefined" ? "undefined" : _typeof(x)) === 'object';
    } }, { name: 'null', test: function test(x) {
      return x === null;
    } }, { name: 'undefined', test: function test(x) {
      return x === undefined;
    } }];

  // TODO: add conversion from BigNumber to number?
  typed.conversions = [{
    from: 'number',
    to: 'BigNumber',
    convert: function convert(x) {
      // note: conversion from number to BigNumber can fail if x has >15 digits
      if (_number.isNumber > 15) {
        throw new TypeError('Cannot implicitly convert a number with >15 significant digits to BigNumber ' + '(value: ' + x + '). ' + 'Use function bignumber(x) to convert to BigNumber.');
      }
      return new type.BigNumber(x);
    }
  }, {
    from: 'number',
    to: 'Complex',
    convert: function convert(x) {
      return new type.Complex(x, 0);
    }
  }, {
    from: 'number',
    to: 'string',
    convert: function convert(x) {
      return x + '';
    }
  }, {
    from: 'BigNumber',
    to: 'Complex',
    convert: function convert(x) {
      return new type.Complex(x.toNumber(), 0);
    }
  }, {
    from: 'Fraction',
    to: 'Complex',
    convert: function convert(x) {
      return new type.Complex(x.valueOf(), 0);
    }
  }, {
    from: 'number',
    to: 'Fraction',
    convert: function convert(x) {
      if (_number.isNumber > 15) {
        throw new TypeError('Cannot implicitly convert a number with >15 significant digits to Fraction ' + '(value: ' + x + '). ' + 'Use function fraction(x) to convert to Fraction.');
      }
      return new type.Fraction(x);
    }
  }, {
    // FIXME: add conversion from Fraction to number, for example for `sqrt(fraction(1,3))`
    //  from: 'Fraction',
    //  to: 'number',
    //  convert: function (x) {
    //    return x.valueOf();
    //  }
    //}, {
    from: 'string',
    to: 'number',
    convert: function convert(x) {
      var n = Number(x);
      if (isNaN(n)) {
        throw new Error('Cannot convert "' + x + '" to a number');
      }
      return n;
    }
  }, {
    from: 'boolean',
    to: 'number',
    convert: function convert(x) {
      return +x;
    }
  }, {
    from: 'boolean',
    to: 'BigNumber',
    convert: function convert(x) {
      return new type.BigNumber(+x);
    }
  }, {
    from: 'boolean',
    to: 'Fraction',
    convert: function convert(x) {
      return new type.Fraction(+x);
    }
  }, {
    from: 'boolean',
    to: 'string',
    convert: function convert(x) {
      return +x;
    }
  }, {
    from: 'null',
    to: 'number',
    convert: function convert() {
      return 0;
    }
  }, {
    from: 'null',
    to: 'string',
    convert: function convert() {
      return 'null';
    }
  }, {
    from: 'null',
    to: 'BigNumber',
    convert: function convert() {
      return new type.BigNumber(0);
    }
  }, {
    from: 'null',
    to: 'Fraction',
    convert: function convert() {
      return new type.Fraction(0);
    }
  }, {
    from: 'Array',
    to: 'Matrix',
    convert: function convert(array) {
      // TODO: how to decide on the right type of matrix to create?
      return new type.DenseMatrix(array);
    }
  }, {
    from: 'Matrix',
    to: 'Array',
    convert: function convert(matrix) {
      return matrix.valueOf();
    }
  }];

  return typed;
};

exports.create = create_exportedObj;

"use strict";

var _gulpUtil = require("gulp-util");

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Validate whether all functions in math.js are documented in math.expression.docs
 */
var prop;

// names to ignore
var ignore = [
// functions not supported or relevant for the parser:
'create', 'typed', 'config', 'on', 'off', 'emit', 'once', 'compile', 'parse', 'parser', 'chain', 'print'];

// test whether all functions are documented
var undocumentedCount = 0;
for (prop in _index.indexjs) {
  if (_index.indexjs.hasOwnProperty(prop)) {
    var obj = _index.indexjs[prop];
    if (_index.indexjs['typeof'](obj) != 'Object') {
      if (!_index.indexjs.expression.docs[prop] && ignore.indexOf(prop) == -1) {
        gutil.log('WARNING: Function ' + prop + ' is undocumented');
        undocumentedCount++;
      }
    }
  }
}

// test whether there is documentation for non existing functions
var nonExistingCount = 0;
var docs = _index.indexjs.expression.docs;
for (prop in docs) {
  if (docs.hasOwnProperty(prop)) {
    if (_index.indexjs[prop] === undefined && !_index.indexjs.type[prop]) {
      gutil.log('WARNING: Documentation for a non-existing function "' + prop + '"');
      nonExistingCount++;
    }
  }
}

// done. Output results
if (undocumentedCount == 0 && nonExistingCount == 0) {
  gutil.log('Validation successful: all functions are documented.');
} else {
  gutil.log('Validation failed: not all functions are documented.');
}

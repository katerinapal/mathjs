import gulputil from "gulp-util";
import * as index from "../index";
/**
 * Validate whether all functions in math.js are documented in math.expression.docs
 */
var gutil = {},
    math = index,
    prop;

// names to ignore
var ignore = [
  // functions not supported or relevant for the parser:
  'create', 'typed', 'config',
  'on', 'off', 'emit', 'once',
  'compile', 'parse', 'parser',
  'chain', 'print'
];

// test whether all functions are documented
var undocumentedCount = 0;
for (prop in index) {
  if (index.hasOwnProperty(prop)) {
    var obj = index[prop];
    if (index['typeof'](obj) != 'Object') {
      if (!index.expression.docs[prop] && (ignore.indexOf(prop) == -1)) {
        gutil.log('WARNING: Function ' + prop + ' is undocumented');
        undocumentedCount++;
      }
    }
  }
}

// test whether there is documentation for non existing functions
var nonExistingCount = 0;
var docs = index.expression.docs;
for (prop in docs) {
  if (docs.hasOwnProperty(prop)) {
    if (index[prop] === undefined && !index.type[prop]) {
      gutil.log('WARNING: Documentation for a non-existing function "' + prop + '"');
      nonExistingCount++;
    }
  }
}

// done. Output results
if (undocumentedCount == 0 && nonExistingCount == 0) {
  gutil.log('Validation successful: all functions are documented.');
}
else {
  gutil.log('Validation failed: not all functions are documented.');
}

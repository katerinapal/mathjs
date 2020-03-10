import gulputil from "gulp-util";
import * as index_obj from "../index";
/**
 * Validate whether all functions in math.js are documented in math.expression.docs
 */
var gutil = {},
    math = index_obj,
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
for (prop in index_obj) {
  if (index_obj.hasOwnProperty(prop)) {
    var obj = index_obj[prop];
    if (index_obj['typeof'](obj) != 'Object') {
      if (!index_obj.expression.docs[prop] && (ignore.indexOf(prop) == -1)) {
        gutil.log('WARNING: Function ' + prop + ' is undocumented');
        undocumentedCount++;
      }
    }
  }
}

// test whether there is documentation for non existing functions
var nonExistingCount = 0;
var docs = index_obj.expression.docs;
for (prop in docs) {
  if (docs.hasOwnProperty(prop)) {
    if (index_obj[prop] === undefined && !index_obj.type[prop]) {
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

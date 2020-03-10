import gulputil_moduleDefault from "gulp-util";
import * as indexjs from "../index";
/**
 * Validate whether all functions in math.js are documented in math.expression.docs
 */
var gutil = {},
    math = indexjs,
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
for (prop in indexjs) {
  if (indexjs.hasOwnProperty(prop)) {
    var obj = indexjs[prop];
    if (indexjs['typeof'](obj) != 'Object') {
      if (!indexjs.expression.docs[prop] && (ignore.indexOf(prop) == -1)) {
        gutil.log('WARNING: Function ' + prop + ' is undocumented');
        undocumentedCount++;
      }
    }
  }
}

// test whether there is documentation for non existing functions
var nonExistingCount = 0;
var docs = indexjs.expression.docs;
for (prop in docs) {
  if (docs.hasOwnProperty(prop)) {
    if (indexjs[prop] === undefined && !indexjs.type[prop]) {
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

import gulputil from "gulp-util";
import { indexjs as index_indexjsjs } from "../index";
/**
 * Validate whether all functions in math.js are documented in math.expression.docs
 */
var prop;

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
for (prop in index_indexjsjs) {
  if (index_indexjsjs.hasOwnProperty(prop)) {
    var obj = index_indexjsjs[prop];
    if (index_indexjsjs['typeof'](obj) != 'Object') {
      if (!index_indexjsjs.expression.docs[prop] && (ignore.indexOf(prop) == -1)) {
        gutil.log('WARNING: Function ' + prop + ' is undocumented');
        undocumentedCount++;
      }
    }
  }
}

// test whether there is documentation for non existing functions
var nonExistingCount = 0;
var docs = index_indexjsjs.expression.docs;
for (prop in docs) {
  if (docs.hasOwnProperty(prop)) {
    if (index_indexjsjs[prop] === undefined && !index_indexjsjs.type[prop]) {
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

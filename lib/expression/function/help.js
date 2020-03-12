'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = exports.math = undefined;

var _docs = require('../docs');

var docs_obj = _interopRequireWildcard(_docs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed, math) {
  var docs = load(docs_obj);

  /**
   * Retrieve help on a function or data type.
   * Help files are retrieved from the documentation in math.expression.docs.
   *
   * Syntax:
   *
   *    math.help(search)
   *
   * Examples:
   *
   *    console.log(math.help('sin').toString());
   *    console.log(math.help(math.add).toString());
   *    console.log(math.help(math.add).toJSON());
   *
   * @param {Function | string | Object} search   A function or function name
   *                                              for which to get help
   * @return {Help} A help object
   */
  return typed('help', {
    'any': function any(search) {
      var prop;
      var name = search;

      if (typeof search !== 'string') {
        for (prop in math) {
          // search in functions and constants
          if (math.hasOwnProperty(prop) && search === math[prop]) {
            name = prop;
            break;
          }
        }

        /* TODO: implement help for data types
         if (!text) {
         // search data type
         for (prop in math.type) {
         if (math.type.hasOwnProperty(prop)) {
         if (search === math.type[prop]) {
         text = prop;
         break;
         }
         }
         }
         }
         */
      }

      var doc = docs[name];
      if (!doc) {
        throw new Error('No documentation found on "' + name + '"');
      }
      return new type.Help(doc);
    }
  });
}

var math_exportedObj = true;
var name_exportedObj = 'help';
var factory_exportedObj = factory;
exports.math = math_exportedObj;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;

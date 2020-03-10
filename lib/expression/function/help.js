import * as docs from "../docs";
'use strict';

function factory (type, config, load, typed, math) {
  var docs = load(docs);

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
    'any': function (search) {
      var prop;
      var name = search;

      if (typeof search !== 'string') {
        for (prop in math) {
          // search in functions and constants
          if (math.hasOwnProperty(prop) && (search === math[prop])) {
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
export { math_exportedObj as math };
export { name_exportedObj as name };
export { factory_exportedObj as factory };

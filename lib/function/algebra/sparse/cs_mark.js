'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.path = exports.name = undefined;

var _cs_flip = require('./cs_flip');

var cs_flip_obj = _interopRequireWildcard(_cs_flip);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load) {

  var cs_flip = load(cs_flip_obj);

  /**
   * Marks the node at w[j]
   *
   * @param {Array}   w               The array
   * @param {Number}  j               The array index
   *
   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
   */
  var cs_mark = function cs_mark(w, j) {
    // mark w[j]
    w[j] = cs_flip(w[j]);
  };

  return cs_mark;
}

var name_exportedObj = 'cs_mark';
var path_exportedObj = 'sparse';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.path = path_exportedObj;
exports.factory = factory_exportedObj;

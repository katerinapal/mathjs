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
   * Flips the value if it is negative of returns the same value otherwise.
   *
   * @param {Number}  i               The value to flip
   *
   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
   */
  var cs_unflip = function cs_unflip(i) {
    // flip the value if it is negative
    return i < 0 ? cs_flip(i) : i;
  };

  return cs_unflip;
}

var name_exportedObj = 'cs_unflip';
var path_exportedObj = 'sparse';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.path = path_exportedObj;
exports.factory = factory_exportedObj;

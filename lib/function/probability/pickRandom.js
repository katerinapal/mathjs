'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _distribution = require('./distribution');

var distribution_distributionjs = _interopRequireWildcard(_distribution);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var distribution = load({});

  /**
   * Random pick a value from a one dimensional array.
   * Array element is picked using a random function with uniform distribution.
   *
   * Syntax:
   *
   *     math.pickRandom(array)
   *
   * Examples:
   *
   *     math.pickRandom([3, 6, 12, 2]);       // returns one of the values in the array
   *
   * See also:
   *
   *     random, randomInt
   *
   * @param {Array} array     A one dimensional array
   * @return {number} One of the elements of the provided input array
   */
  // TODO: rework pickRandom to a typed-function
  var pickRandom = distribution('uniform').pickRandom;

  pickRandom.toTex = undefined; // use default template

  return pickRandom;
}

var name_name = 'pickRandom';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;

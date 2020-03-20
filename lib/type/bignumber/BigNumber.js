'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.math = exports.factory = exports.path = exports.name = undefined;

var _decimal = require('decimal.js');

var _decimal2 = _interopRequireDefault(_decimal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function factory(type, config, load, typed, math) {
  var BigNumber = _decimal2.default.clone({ precision: config.precision });

  /**
   * Attach type information
   */
  BigNumber.prototype.type = 'BigNumber';
  BigNumber.prototype.isBigNumber = true;

  /**
   * Get a JSON representation of a BigNumber containing
   * type information
   * @returns {Object} Returns a JSON object structured as:
   *                   `{"mathjs": "BigNumber", "value": "0.2"}`
   */
  BigNumber.prototype.toJSON = function () {
    return {
      mathjs: 'BigNumber',
      value: this.toString()
    };
  };

  /**
   * Instantiate a BigNumber from a JSON object
   * @param {Object} json  a JSON object structured as:
   *                       `{"mathjs": "BigNumber", "value": "0.2"}`
   * @return {BigNumber}
   */
  BigNumber.fromJSON = function (json) {
    return new BigNumber(json.value);
  };

  // listen for changed in the configuration, automatically apply changed precision
  math.on('config', function (curr, prev) {
    if (curr.precision !== prev.precision) {
      BigNumber.config({ precision: curr.precision });
    }
  });

  return BigNumber;
}

var name_name = 'BigNumber';
var path_path = 'type';
var factory_factory = factory;
var math_math = true;
exports.name = name_name;
exports.path = path_path;
exports.factory = factory_factory;
exports.math = math_math;

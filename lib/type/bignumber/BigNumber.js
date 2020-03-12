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

var name_exportedObj = 'BigNumber';
var path_exportedObj = 'type';
var factory_exportedObj = factory;
var math_exportedObj = true;
exports.name = name_exportedObj;
exports.path = path_exportedObj;
exports.factory = factory_exportedObj;
exports.math = math_exportedObj;

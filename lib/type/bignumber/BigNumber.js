import decimal_moduleDefault from "decimal.js";
var Decimal = {};

function factory (type, config, load, typed, math) {
  var BigNumber = Decimal.clone({precision: config.precision});

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
export { name_exportedObj as name };
export { path_exportedObj as path };
export { factory_exportedObj as factory };
export { math_exportedObj as math };
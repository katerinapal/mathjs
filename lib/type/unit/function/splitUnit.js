'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepMap = require('../../../utils/collection/deepMap');

'use strict';

function factory(type, config, load, typed) {

  /**
   * Returns an array of units whose sum is equal to this unit
   *
   * Syntax:
   *
   *     splitUnit(unit: Unit, parts: Array.<Unit>)
   *
   * Example:
   *
   *     splitUnit(new Unit(1, 'm'), ['feet', 'inch']);
   *     // [ 3 feet, 3.3700787401575 inch ]
   *
   * See also:
   *
   *     unit
   *
   * @param {Array} [parts] An array of strings or valueless units.
   * @return {Array} An array of units.
   */

  var splitUnit = typed('splitUnit', {
    'Unit, Array': function UnitArray(unit, parts) {
      return unit.splitUnit(parts);
    }
  });

  return splitUnit;
}

var name_exportedObj = 'splitUnit';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;

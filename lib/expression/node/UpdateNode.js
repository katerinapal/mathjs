'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function factory(type, config, load, typed) {
  /**
   * @constructor UpdateNode
   */
  function UpdateNode() {
    // TODO: deprecated since v3. Cleanup some day
    throw new Error('UpdateNode is deprecated. Use AssignmentNode instead.');
  }

  return UpdateNode;
}

var name_exportedObj = 'UpdateNode';
var path_exportedObj = 'expression.node';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.path = path_exportedObj;
exports.factory = factory_exportedObj;

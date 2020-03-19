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

var name_name = 'UpdateNode';
var path_path = 'expression.node';
var factory_factory = factory;
exports.name = name_name;
exports.path = path_path;
exports.factory = factory_factory;

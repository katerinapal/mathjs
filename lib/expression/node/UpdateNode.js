'use strict';

function factory (type, config, load, typed) {
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
export { name_name as name };
export { path_path as path };
export { factory_factory as factory };

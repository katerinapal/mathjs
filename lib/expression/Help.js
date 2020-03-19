"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.path = exports.name = undefined;

var _object = require("../utils/object");

var _string = require("../utils/string");

var _parser = require("./function/parser");

var functionparser_obj = _interopRequireWildcard(_parser);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var parser = load(functionparser_obj)();

  /**
   * Documentation object
   * @param {Object} doc  Object containing properties:
   *                      {string} name
   *                      {string} category
   *                      {string} description
   *                      {string[]} syntax
   *                      {string[]} examples
   *                      {string[]} seealso
   * @constructor
   */
  function Help(doc) {
    if (!(this instanceof Help)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    if (!doc) throw new Error('Argument "doc" missing');

    this.doc = doc;
  }

  /**
   * Attach type information
   */
  Help.prototype.type = 'Help';
  Help.prototype.isHelp = true;

  /**
   * Generate a string representation of the Help object
   * @return {string} Returns a string
   * @private
   */
  Help.prototype.toString = function () {
    var doc = this.doc || {};
    var desc = '\n';

    if (doc.name) {
      desc += 'Name: ' + doc.name + '\n\n';
    }
    if (doc.category) {
      desc += 'Category: ' + doc.category + '\n\n';
    }
    if (doc.description) {
      desc += 'Description:\n    ' + doc.description + '\n\n';
    }
    if (doc.syntax) {
      desc += 'Syntax:\n    ' + doc.syntax.join('\n    ') + '\n\n';
    }
    if (doc.examples) {
      desc += 'Examples:\n';
      for (var i = 0; i < doc.examples.length; i++) {
        var expr = doc.examples[i];
        desc += '    ' + expr + '\n';

        var res;
        try {
          res = parser.eval(expr);
        } catch (e) {
          res = e;
        }
        if (res && !res.isHelp) {
          desc += '        ' + (0, _string.format)(res, { precision: 14 }) + '\n';
        }
      }
      desc += '\n';
    }
    if (doc.seealso) {
      desc += 'See also: ' + doc.seealso.join(', ') + '\n';
    }

    return desc;
  };

  /**
   * Export the help object to JSON
   */
  Help.prototype.toJSON = function () {
    var obj = (0, _object.clone)(this.doc);
    obj.mathjs = 'Help';
    return obj;
  };

  /**
   * Instantiate a Help object from a JSON object
   * @param {Object} json
   * @returns {Help} Returns a new Help object
   */
  Help.fromJSON = function (json) {
    var doc = {};
    for (var prop in json) {
      if (prop !== 'mathjs') {
        // ignore mathjs field
        doc[prop] = json[prop];
      }
    }
    return new Help(doc);
  };

  /**
   * Returns a string representation of the Help object
   */
  Help.prototype.valueOf = Help.prototype.toString;

  return Help;
}

var name_name = 'Help';
var path_path = 'type';
var factory_factory = factory;
exports.name = name_name;
exports.path = path_path;
exports.factory = factory_factory;

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var indexjs_indexjs = {
  'name': 'index',
  'category': 'Construction',
  'syntax': ['[start]', '[start:end]', '[start:step:end]', '[start1, start 2, ...]', '[start1:end1, start2:end2, ...]', '[start1:step1:end1, start2:step2:end2, ...]'],
  'description': 'Create an index to get or replace a subset of a matrix',
  'examples': ['[]', '[1, 2, 3]', 'A = [1, 2, 3; 4, 5, 6]', 'A[1, :]', 'A[1, 2] = 50', 'A[0:2, 0:2] = ones(2, 2)'],
  'seealso': ['bignumber', 'boolean', 'complex', 'matrix,', 'number', 'range', 'string', 'unit']
};

var indexjs_indexjs_name = "index";
var indexjs_indexjs_category = "Construction";

var indexjs_indexjs_syntax = ["[start]", "[start:end]", "[start:step:end]", "[start1, start 2, ...]", "[start1:end1, start2:end2, ...]", "[start1:step1:end1, start2:step2:end2, ...]"];

var indexjs_indexjs_description = "Create an index to get or replace a subset of a matrix";

var indexjs_indexjs_examples = ["[]", "[1, 2, 3]", "A = [1, 2, 3; 4, 5, 6]", "A[1, :]", "A[1, 2] = 50", "A[0:2, 0:2] = ones(2, 2)"];

var indexjs_indexjs_seealso = ["bignumber", "boolean", "complex", "matrix,", "number", "range", "string", "unit"];

exports.name = indexjs_indexjs_name;
exports.category = indexjs_indexjs_category;
exports.syntax = indexjs_indexjs_syntax;
exports.description = indexjs_indexjs_description;
exports.examples = indexjs_indexjs_examples;
exports.seealso = indexjs_indexjs_seealso;

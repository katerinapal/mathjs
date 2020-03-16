'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var partitionSelectjs_partitionSelectjs = {
  'name': 'partitionSelect',
  'category': 'Matrix',
  'syntax': ['partitionSelect(x, k)', 'partitionSelect(x, k, compare)'],
  'description': 'Partition-based selection of an array or 1D matrix. Will find the kth smallest value, and mutates the input array. Uses Quickselect.',
  'examples': ['partitionSelect([5, 10, 1], 2)', 'partitionSelect(["C", "B", "A", "D"], 1)'],
  'seealso': ['sort']
};

var partitionSelectjs_partitionSelectjs_name = "partitionSelect";
var partitionSelectjs_partitionSelectjs_category = "Matrix";
var partitionSelectjs_partitionSelectjs_syntax = ["partitionSelect(x, k)", "partitionSelect(x, k, compare)"];
var partitionSelectjs_partitionSelectjs_description = "Partition-based selection of an array or 1D matrix. Will find the kth smallest value, and mutates the input array. Uses Quickselect.";

var partitionSelectjs_partitionSelectjs_examples = ["partitionSelect([5, 10, 1], 2)", "partitionSelect([\"C\", \"B\", \"A\", \"D\"], 1)"];

var partitionSelectjs_partitionSelectjs_seealso = ["sort"];
exports.name = partitionSelectjs_partitionSelectjs_name;
exports.category = partitionSelectjs_partitionSelectjs_category;
exports.syntax = partitionSelectjs_partitionSelectjs_syntax;
exports.description = partitionSelectjs_partitionSelectjs_description;
exports.examples = partitionSelectjs_partitionSelectjs_examples;
exports.seealso = partitionSelectjs_partitionSelectjs_seealso;

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sortjs_sortjs = {
  'name': 'sort',
  'category': 'Matrix',
  'syntax': ['sort(x)', 'sort(x, compare)'],
  'description': 'Sort the items in a matrix. Compare can be a string "asc" or "desc", or a custom sort function.',
  'examples': ['sort([5, 10, 1])', 'sort(["C", "B", "A", "D"])', 'sortByLength(a, b) = size(a)[1] - size(b)[1]', 'sort(["Langdon", "Tom", "Sara"], sortByLength)'],
  'seealso': ['map', 'filter', 'forEach']
};

var sortjs_sortjs_name = "sort";
var sortjs_sortjs_category = "Matrix";
var sortjs_sortjs_syntax = ["sort(x)", "sort(x, compare)"];
var sortjs_sortjs_description = "Sort the items in a matrix. Compare can be a string \"asc\" or \"desc\", or a custom sort function.";

var sortjs_sortjs_examples = ["sort([5, 10, 1])", "sort([\"C\", \"B\", \"A\", \"D\"])", "sortByLength(a, b) = size(a)[1] - size(b)[1]", "sort([\"Langdon\", \"Tom\", \"Sara\"], sortByLength)"];

var sortjs_sortjs_seealso = ["map", "filter", "forEach"];
exports.name = sortjs_sortjs_name;
exports.category = sortjs_sortjs_category;
exports.syntax = sortjs_sortjs_syntax;
exports.description = sortjs_sortjs_description;
exports.examples = sortjs_sortjs_examples;
exports.seealso = sortjs_sortjs_seealso;

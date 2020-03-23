'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var subsetjs_subsetjs = {
  'name': 'subset',
  'category': 'Matrix',
  'syntax': ['value(index)', 'value(index) = replacement', 'subset(value, [index])', 'subset(value, [index], replacement)'],
  'description': 'Get or set a subset of a matrix or string. ' + 'Indexes are one-based. ' + 'Both the ranges lower-bound and upper-bound are included.',
  'examples': ['d = [1, 2; 3, 4]', 'e = []', 'e[1, 1:2] = [5, 6]', 'e[2, :] = [7, 8]', 'f = d * e', 'f[2, 1]', 'f[:, 1]'],
  'seealso': ['concat', 'det', 'diag', 'eye', 'inv', 'ones', 'range', 'size', 'squeeze', 'trace', 'transpose', 'zeros']
};

var subsetjs_subsetjs_name = "subset";
var subsetjs_subsetjs_category = "Matrix";

var subsetjs_subsetjs_syntax = ["value(index)", "value(index) = replacement", "subset(value, [index])", "subset(value, [index], replacement)"];

var subsetjs_subsetjs_description = "Get or set a subset of a matrix or string. " + "Indexes are one-based. " + "Both the ranges lower-bound and upper-bound are included.";

var subsetjs_subsetjs_examples = ["d = [1, 2; 3, 4]", "e = []", "e[1, 1:2] = [5, 6]", "e[2, :] = [7, 8]", "f = d * e", "f[2, 1]", "f[:, 1]"];

var subsetjs_subsetjs_seealso = ["concat", "det", "diag", "eye", "inv", "ones", "range", "size", "squeeze", "trace", "transpose", "zeros"];

exports.name = subsetjs_subsetjs_name;
exports.category = subsetjs_subsetjs_category;
exports.syntax = subsetjs_subsetjs_syntax;
exports.description = subsetjs_subsetjs_description;
exports.examples = subsetjs_subsetjs_examples;
exports.seealso = subsetjs_subsetjs_seealso;

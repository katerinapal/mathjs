'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var quantileSeqjs_quantileSeqjs = {
  'name': 'quantileSeq',
  'category': 'Statistics',
  'syntax': ['quantileSeq(A, prob[, sorted])', 'quantileSeq(A, [prob1, prob2, ...][, sorted])', 'quantileSeq(A, N[, sorted])'],
  'description': 'Compute the prob order quantile of a matrix or a list with values. The sequence is sorted and the middle value is returned. Supported types of sequence values are: Number, BigNumber, Unit Supported types of probablity are: Number, BigNumber. \n\nIn case of a (multi dimensional) array or matrix, the prob order quantile of all elements will be calculated.',
  'examples': ['quantileSeq([3, -1, 5, 7], 0.5)', 'quantileSeq([3, -1, 5, 7], [1/3, 2/3])', 'quantileSeq([3, -1, 5, 7], 2)', 'quantileSeq([-1, 3, 5, 7], 0.5, true)'],
  'seealso': ['mean', 'median', 'min', 'max', 'prod', 'std', 'sum', 'var']
};

var quantileSeqjs_quantileSeqjs_name = "quantileSeq";
var quantileSeqjs_quantileSeqjs_category = "Statistics";

var quantileSeqjs_quantileSeqjs_syntax = ["quantileSeq(A, prob[, sorted])", "quantileSeq(A, [prob1, prob2, ...][, sorted])", "quantileSeq(A, N[, sorted])"];

var quantileSeqjs_quantileSeqjs_description = "Compute the prob order quantile of a matrix or a list with values. The sequence is sorted and the middle value is returned. Supported types of sequence values are: Number, BigNumber, Unit Supported types of probablity are: Number, BigNumber. \n\nIn case of a (multi dimensional) array or matrix, the prob order quantile of all elements will be calculated.";

var quantileSeqjs_quantileSeqjs_examples = ["quantileSeq([3, -1, 5, 7], 0.5)", "quantileSeq([3, -1, 5, 7], [1/3, 2/3])", "quantileSeq([3, -1, 5, 7], 2)", "quantileSeq([-1, 3, 5, 7], 0.5, true)"];

var quantileSeqjs_quantileSeqjs_seealso = ["mean", "median", "min", "max", "prod", "std", "sum", "var"];
exports.name = quantileSeqjs_quantileSeqjs_name;
exports.category = quantileSeqjs_quantileSeqjs_category;
exports.syntax = quantileSeqjs_quantileSeqjs_syntax;
exports.description = quantileSeqjs_quantileSeqjs_description;
exports.examples = quantileSeqjs_quantileSeqjs_examples;
exports.seealso = quantileSeqjs_quantileSeqjs_seealso;

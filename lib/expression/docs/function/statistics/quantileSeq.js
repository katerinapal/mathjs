var quantileSeqjs_exportedObj = {
  'name': 'quantileSeq',
  'category': 'Statistics',
  'syntax': [
    'quantileSeq(A, prob[, sorted])',
    'quantileSeq(A, [prob1, prob2, ...][, sorted])',
    'quantileSeq(A, N[, sorted])'
  ],
  'description': 'Compute the prob order quantile of a matrix or a list with values. The sequence is sorted and the middle value is returned. Supported types of sequence values are: Number, BigNumber, Unit Supported types of probablity are: Number, BigNumber. \n\nIn case of a (multi dimensional) array or matrix, the prob order quantile of all elements will be calculated.',
  'examples': [
    'quantileSeq([3, -1, 5, 7], 0.5)',
    'quantileSeq([3, -1, 5, 7], [1/3, 2/3])',
    'quantileSeq([3, -1, 5, 7], 2)',
    'quantileSeq([-1, 3, 5, 7], 0.5, true)'
  ],
  'seealso': [
    'mean',
    'median',
    'min',
    'max',
    'prod',
    'std',
    'sum',
    'var'
  ]
};

var quantileSeqjs_exportedObj_name = "quantileSeq";
var quantileSeqjs_exportedObj_category = "Statistics";

var quantileSeqjs_exportedObj_syntax = [
  "quantileSeq(A, prob[, sorted])",
  "quantileSeq(A, [prob1, prob2, ...][, sorted])",
  "quantileSeq(A, N[, sorted])"
];

var quantileSeqjs_exportedObj_description = "Compute the prob order quantile of a matrix or a list with values. The sequence is sorted and the middle value is returned. Supported types of sequence values are: Number, BigNumber, Unit Supported types of probablity are: Number, BigNumber. \n\nIn case of a (multi dimensional) array or matrix, the prob order quantile of all elements will be calculated.";

var quantileSeqjs_exportedObj_examples = [
  "quantileSeq([3, -1, 5, 7], 0.5)",
  "quantileSeq([3, -1, 5, 7], [1/3, 2/3])",
  "quantileSeq([3, -1, 5, 7], 2)",
  "quantileSeq([-1, 3, 5, 7], 0.5, true)"
];

var quantileSeqjs_exportedObj_seealso = ["mean", "median", "min", "max", "prod", "std", "sum", "var"];
export { quantileSeqjs_exportedObj_name as name, quantileSeqjs_exportedObj_category as category, quantileSeqjs_exportedObj_syntax as syntax, quantileSeqjs_exportedObj_description as description, quantileSeqjs_exportedObj_examples as examples, quantileSeqjs_exportedObj_seealso as seealso };
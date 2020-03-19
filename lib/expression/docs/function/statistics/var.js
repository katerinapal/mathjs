var varjs_varjs = {
  'name': 'var',
  'category': 'Statistics',
  'syntax': [
    'var(a, b, c, ...)',
    'var(A)',
    'var(A, normalization)'
  ],
  'description': 'Compute the variance of all values. Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',
  'examples': [
    'var(2, 4, 6)',
    'var([2, 4, 6, 8])',
    'var([2, 4, 6, 8], "uncorrected")',
    'var([2, 4, 6, 8], "biased")',
    'var([1, 2, 3; 4, 5, 6])'
  ],
  'seealso': [
    'max',
    'mean',
    'min',
    'median',
    'min',
    'prod',
    'std',
    'sum'
  ]
};

var varjs_varjs_name = "var";
var varjs_varjs_category = "Statistics";
var varjs_varjs_syntax = ["var(a, b, c, ...)", "var(A)", "var(A, normalization)"];
var varjs_varjs_description = "Compute the variance of all values. Optional parameter normalization can be \"unbiased\" (default), \"uncorrected\", or \"biased\".";

var varjs_varjs_examples = [
  "var(2, 4, 6)",
  "var([2, 4, 6, 8])",
  "var([2, 4, 6, 8], \"uncorrected\")",
  "var([2, 4, 6, 8], \"biased\")",
  "var([1, 2, 3; 4, 5, 6])"
];

var varjs_varjs_seealso = ["max", "mean", "min", "median", "min", "prod", "std", "sum"];
export { varjs_varjs_name as name, varjs_varjs_category as category, varjs_varjs_syntax as syntax, varjs_varjs_description as description, varjs_varjs_examples as examples, varjs_varjs_seealso as seealso };

var maxjs_maxjs = {
  'name': 'max',
  'category': 'Statistics',
  'syntax': [
    'max(a, b, c, ...)',
    'max(A)',
    'max(A, dim)'
  ],
  'description': 'Compute the maximum value of a list of values.',
  'examples': [
    'max(2, 3, 4, 1)',
    'max([2, 3, 4, 1])',
    'max([2, 5; 4, 3])',
    'max([2, 5; 4, 3], 1)',
    'max([2, 5; 4, 3], 2)',
    'max(2.7, 7.1, -4.5, 2.0, 4.1)',
    'min(2.7, 7.1, -4.5, 2.0, 4.1)'
  ],
  'seealso': [
    'mean',
    'median',
    'min',
    'prod',
    'std',
    'sum',
    'var'
  ]
};

var maxjs_maxjs_name = "max";
var maxjs_maxjs_category = "Statistics";
var maxjs_maxjs_syntax = ["max(a, b, c, ...)", "max(A)", "max(A, dim)"];
var maxjs_maxjs_description = "Compute the maximum value of a list of values.";

var maxjs_maxjs_examples = [
  "max(2, 3, 4, 1)",
  "max([2, 3, 4, 1])",
  "max([2, 5; 4, 3])",
  "max([2, 5; 4, 3], 1)",
  "max([2, 5; 4, 3], 2)",
  "max(2.7, 7.1, -4.5, 2.0, 4.1)",
  "min(2.7, 7.1, -4.5, 2.0, 4.1)"
];

var maxjs_maxjs_seealso = ["mean", "median", "min", "prod", "std", "sum", "var"];
export { maxjs_maxjs_name as name, maxjs_maxjs_category as category, maxjs_maxjs_syntax as syntax, maxjs_maxjs_description as description, maxjs_maxjs_examples as examples, maxjs_maxjs_seealso as seealso };

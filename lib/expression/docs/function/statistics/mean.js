var meanjs_meanjs = {
  'name': 'mean',
  'category': 'Statistics',
  'syntax': [
    'mean(a, b, c, ...)',
    'mean(A)',
    'mean(A, dim)'
  ],
  'description': 'Compute the arithmetic mean of a list of values.',
  'examples': [
    'mean(2, 3, 4, 1)',
    'mean([2, 3, 4, 1])',
    'mean([2, 5; 4, 3])',
    'mean([2, 5; 4, 3], 1)',
    'mean([2, 5; 4, 3], 2)',
    'mean([1.0, 2.7, 3.2, 4.0])'
  ],
  'seealso': [
    'max',
    'median',
    'min',
    'prod',
    'std',
    'sum',
    'var'
  ]
};

var meanjs_meanjs_name = "mean";
var meanjs_meanjs_category = "Statistics";
var meanjs_meanjs_syntax = ["mean(a, b, c, ...)", "mean(A)", "mean(A, dim)"];
var meanjs_meanjs_description = "Compute the arithmetic mean of a list of values.";

var meanjs_meanjs_examples = [
  "mean(2, 3, 4, 1)",
  "mean([2, 3, 4, 1])",
  "mean([2, 5; 4, 3])",
  "mean([2, 5; 4, 3], 1)",
  "mean([2, 5; 4, 3], 2)",
  "mean([1.0, 2.7, 3.2, 4.0])"
];

var meanjs_meanjs_seealso = ["max", "median", "min", "prod", "std", "sum", "var"];
export { meanjs_meanjs_name as name, meanjs_meanjs_category as category, meanjs_meanjs_syntax as syntax, meanjs_meanjs_description as description, meanjs_meanjs_examples as examples, meanjs_meanjs_seealso as seealso };

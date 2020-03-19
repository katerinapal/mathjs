var usolvejs_usolvejs = {
  'name': 'usolve',
  'category': 'Algebra',
  'syntax': [
    'x=usolve(U, b)'
  ],
  'description':
  'Solves the linear system U * x = b where U is an [n x n] upper triangular matrix and b is a [n] column vector.',
  'examples': [
    'x=usolve(sparse([1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1]), [1; 2; 3; 4])'
  ],
  'seealso': [
    'lup', 'lusolve', 'lsolve', 'matrix', 'sparse'
  ]
};

var usolvejs_usolvejs_name = "usolve";
var usolvejs_usolvejs_category = "Algebra";
var usolvejs_usolvejs_syntax = ["x=usolve(U, b)"];
var usolvejs_usolvejs_description = "Solves the linear system U * x = b where U is an [n x n] upper triangular matrix and b is a [n] column vector.";

var usolvejs_usolvejs_examples = [
  "x=usolve(sparse([1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1]), [1; 2; 3; 4])"
];

var usolvejs_usolvejs_seealso = ["lup", "lusolve", "lsolve", "matrix", "sparse"];
export { usolvejs_usolvejs_name as name, usolvejs_usolvejs_category as category, usolvejs_usolvejs_syntax as syntax, usolvejs_usolvejs_description as description, usolvejs_usolvejs_examples as examples, usolvejs_usolvejs_seealso as seealso };

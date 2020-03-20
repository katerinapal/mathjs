var lsolvejs_lsolvejs = {
  'name': 'lsolve',
  'category': 'Algebra',
  'syntax': [
    'x=lsolve(L, b)'
  ],
  'description':
  'Solves the linear system L * x = b where L is an [n x n] lower triangular matrix and b is a [n] column vector.',
  'examples': [
    'a = [-2, 3; 2, 1]',
    'b = [11, 9]',
    'x = lsolve(a, b)'
  ],
  'seealso': [
    'lup', 'lusolve', 'usolve', 'matrix', 'sparse'
  ]
};

var lsolvejs_lsolvejs_name = "lsolve";
var lsolvejs_lsolvejs_category = "Algebra";
var lsolvejs_lsolvejs_syntax = ["x=lsolve(L, b)"];
var lsolvejs_lsolvejs_description = "Solves the linear system L * x = b where L is an [n x n] lower triangular matrix and b is a [n] column vector.";
var lsolvejs_lsolvejs_examples = ["a = [-2, 3; 2, 1]", "b = [11, 9]", "x = lsolve(a, b)"];
var lsolvejs_lsolvejs_seealso = ["lup", "lusolve", "usolve", "matrix", "sparse"];
export { lsolvejs_lsolvejs_name as name, lsolvejs_lsolvejs_category as category, lsolvejs_lsolvejs_syntax as syntax, lsolvejs_lsolvejs_description as description, lsolvejs_lsolvejs_examples as examples, lsolvejs_lsolvejs_seealso as seealso };

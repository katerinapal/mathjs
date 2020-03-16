var lusolvejs_lusolvejs = {
  'name': 'lusolve',
  'category': 'Algebra',
  'syntax': [
    'x=lusolve(A, b)',
    'x=lusolve(lu, b)'
  ],
  'description': 'Solves the linear system A * x = b where A is an [n x n] matrix and b is a [n] column vector.',
  'examples': [
    'a = [-2, 3; 2, 1]',
    'b = [11, 9]',
    'x = lusolve(a, b)'
  ],
  'seealso': [
    'lup', 'slu', 'lsolve', 'usolve', 'matrix', 'sparse'
  ]
};

var lusolvejs_lusolvejs_name = "lusolve";
var lusolvejs_lusolvejs_category = "Algebra";
var lusolvejs_lusolvejs_syntax = ["x=lusolve(A, b)", "x=lusolve(lu, b)"];
var lusolvejs_lusolvejs_description = "Solves the linear system A * x = b where A is an [n x n] matrix and b is a [n] column vector.";
var lusolvejs_lusolvejs_examples = ["a = [-2, 3; 2, 1]", "b = [11, 9]", "x = lusolve(a, b)"];
var lusolvejs_lusolvejs_seealso = ["lup", "slu", "lsolve", "usolve", "matrix", "sparse"];
export { lusolvejs_lusolvejs_name as name, lusolvejs_lusolvejs_category as category, lusolvejs_lusolvejs_syntax as syntax, lusolvejs_lusolvejs_description as description, lusolvejs_lusolvejs_examples as examples, lusolvejs_lusolvejs_seealso as seealso };

var lupjs_exportedObj = {
  'name': 'lup',
  'category': 'Algebra',
  'syntax': [
    'lup(m)'
  ],
  'description':
  'Calculate the Matrix LU decomposition with partial pivoting. Matrix A is decomposed in three matrices (L, U, P) where P * A = L * U',
  'examples': [
    'lup([[2, 1], [1, 4]])',
    'lup(matrix([[2, 1], [1, 4]]))',
    'lup(sparse([[2, 1], [1, 4]]))'
  ],
  'seealso': [
    'lusolve', 'lsolve', 'usolve', 'matrix', 'sparse', 'slu'
  ]
};

var lupjs_exportedObj_name = "lup";
var lupjs_exportedObj_category = "Algebra";
var lupjs_exportedObj_syntax = ["lup(m)"];
var lupjs_exportedObj_description = "Calculate the Matrix LU decomposition with partial pivoting. Matrix A is decomposed in three matrices (L, U, P) where P * A = L * U";

var lupjs_exportedObj_examples = [
  "lup([[2, 1], [1, 4]])",
  "lup(matrix([[2, 1], [1, 4]]))",
  "lup(sparse([[2, 1], [1, 4]]))"
];

var lupjs_exportedObj_seealso = ["lusolve", "lsolve", "usolve", "matrix", "sparse", "slu"];
export { lupjs_exportedObj_name as name, lupjs_exportedObj_category as category, lupjs_exportedObj_syntax as syntax, lupjs_exportedObj_description as description, lupjs_exportedObj_examples as examples, lupjs_exportedObj_seealso as seealso };

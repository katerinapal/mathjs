var slujs_exportedObj = {
  'name': 'slu',
  'category': 'Algebra',
  'syntax': [
    'slu(A, order, threshold)'
  ],
  'description': 'Calculate the Matrix LU decomposition with full pivoting. Matrix A is decomposed in two matrices (L, U) and two permutation vectors (pinv, q) where P * A * Q = L * U',
  'examples': [
    'slu(sparse([4.5, 0, 3.2, 0; 3.1, 2.9, 0, 0.9; 0, 1.7, 3, 0; 3.5, 0.4, 0, 1]), 1, 0.001)'
  ],
  'seealso': [
    'lusolve', 'lsolve', 'usolve', 'matrix', 'sparse', 'lup'
  ]
};

var slujs_exportedObj_name = "slu";
var slujs_exportedObj_category = "Algebra";
var slujs_exportedObj_syntax = ["slu(A, order, threshold)"];
var slujs_exportedObj_description = "Calculate the Matrix LU decomposition with full pivoting. Matrix A is decomposed in two matrices (L, U) and two permutation vectors (pinv, q) where P * A * Q = L * U";

var slujs_exportedObj_examples = [
  "slu(sparse([4.5, 0, 3.2, 0; 3.1, 2.9, 0, 0.9; 0, 1.7, 3, 0; 3.5, 0.4, 0, 1]), 1, 0.001)"
];

var slujs_exportedObj_seealso = ["lusolve", "lsolve", "usolve", "matrix", "sparse", "lup"];
export { slujs_exportedObj_name as name, slujs_exportedObj_category as category, slujs_exportedObj_syntax as syntax, slujs_exportedObj_description as description, slujs_exportedObj_examples as examples, slujs_exportedObj_seealso as seealso };

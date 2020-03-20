var slujs_slujs = {
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

var slujs_slujs_name = "slu";
var slujs_slujs_category = "Algebra";
var slujs_slujs_syntax = ["slu(A, order, threshold)"];
var slujs_slujs_description = "Calculate the Matrix LU decomposition with full pivoting. Matrix A is decomposed in two matrices (L, U) and two permutation vectors (pinv, q) where P * A * Q = L * U";

var slujs_slujs_examples = [
  "slu(sparse([4.5, 0, 3.2, 0; 3.1, 2.9, 0, 0.9; 0, 1.7, 3, 0; 3.5, 0.4, 0, 1]), 1, 0.001)"
];

var slujs_slujs_seealso = ["lusolve", "lsolve", "usolve", "matrix", "sparse", "lup"];
export { slujs_slujs_name as name, slujs_slujs_category as category, slujs_slujs_syntax as syntax, slujs_slujs_description as description, slujs_slujs_examples as examples, slujs_slujs_seealso as seealso };

var eyejs_eyejs = {
  'name': 'eye',
  'category': 'Matrix',
  'syntax': [
    'eye(n)',
    'eye(m, n)',
    'eye([m, n])',
    'eye'
  ],
  'description': 'Returns the identity matrix with size m-by-n. The matrix has ones on the diagonal and zeros elsewhere.',
  'examples': [
    'eye(3)',
    'eye(3, 5)',
    'a = [1, 2, 3; 4, 5, 6]',
    'eye(size(a))'
  ],
  'seealso': [
    'concat', 'det', 'diag', 'inv', 'ones', 'range', 'size', 'squeeze', 'subset', 'trace', 'transpose', 'zeros'
  ]
};

var eyejs_eyejs_name = "eye";
var eyejs_eyejs_category = "Matrix";
var eyejs_eyejs_syntax = ["eye(n)", "eye(m, n)", "eye([m, n])", "eye"];
var eyejs_eyejs_description = "Returns the identity matrix with size m-by-n. The matrix has ones on the diagonal and zeros elsewhere.";
var eyejs_eyejs_examples = ["eye(3)", "eye(3, 5)", "a = [1, 2, 3; 4, 5, 6]", "eye(size(a))"];

var eyejs_eyejs_seealso = [
  "concat",
  "det",
  "diag",
  "inv",
  "ones",
  "range",
  "size",
  "squeeze",
  "subset",
  "trace",
  "transpose",
  "zeros"
];

export { eyejs_eyejs_name as name, eyejs_eyejs_category as category, eyejs_eyejs_syntax as syntax, eyejs_eyejs_description as description, eyejs_eyejs_examples as examples, eyejs_eyejs_seealso as seealso };

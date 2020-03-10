var eyejs_exportedObj = {
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

var eyejs_exportedObj_name = "eye";
var eyejs_exportedObj_category = "Matrix";
var eyejs_exportedObj_syntax = ["eye(n)", "eye(m, n)", "eye([m, n])", "eye"];
var eyejs_exportedObj_description = "Returns the identity matrix with size m-by-n. The matrix has ones on the diagonal and zeros elsewhere.";
var eyejs_exportedObj_examples = ["eye(3)", "eye(3, 5)", "a = [1, 2, 3; 4, 5, 6]", "eye(size(a))"];

var eyejs_exportedObj_seealso = [
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

export { eyejs_exportedObj_name as name, eyejs_exportedObj_category as category, eyejs_exportedObj_syntax as syntax, eyejs_exportedObj_description as description, eyejs_exportedObj_examples as examples, eyejs_exportedObj_seealso as seealso };

var concatjs_exportedObj = {
  'name': 'concat',
  'category': 'Matrix',
  'syntax': [
    'concat(A, B, C, ...)',
    'concat(A, B, C, ..., dim)'
  ],
  'description': 'Concatenate matrices. By default, the matrices are concatenated by the last dimension. The dimension on which to concatenate can be provided as last argument.',
  'examples': [
    'A = [1, 2; 5, 6]',
    'B = [3, 4; 7, 8]',
    'concat(A, B)',
    'concat(A, B, 1)',
    'concat(A, B, 2)'
  ],
  'seealso': [
    'det', 'diag', 'eye', 'inv', 'ones', 'range', 'size', 'squeeze', 'subset', 'trace', 'transpose', 'zeros'
  ]
};

var concatjs_exportedObj_name = "concat";
var concatjs_exportedObj_category = "Matrix";
var concatjs_exportedObj_syntax = ["concat(A, B, C, ...)", "concat(A, B, C, ..., dim)"];
var concatjs_exportedObj_description = "Concatenate matrices. By default, the matrices are concatenated by the last dimension. The dimension on which to concatenate can be provided as last argument.";

var concatjs_exportedObj_examples = [
  "A = [1, 2; 5, 6]",
  "B = [3, 4; 7, 8]",
  "concat(A, B)",
  "concat(A, B, 1)",
  "concat(A, B, 2)"
];

var concatjs_exportedObj_seealso = [
  "det",
  "diag",
  "eye",
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

export { concatjs_exportedObj_name as name, concatjs_exportedObj_category as category, concatjs_exportedObj_syntax as syntax, concatjs_exportedObj_description as description, concatjs_exportedObj_examples as examples, concatjs_exportedObj_seealso as seealso };

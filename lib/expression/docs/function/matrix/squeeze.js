var squeezejs_squeezejs = {
  'name': 'squeeze',
  'category': 'Matrix',
  'syntax': [
    'squeeze(x)'
  ],
  'description': 'Remove inner and outer singleton dimensions from a matrix.',
  'examples': [
    'a = zeros(3,2,1)',
    'size(squeeze(a))',
    'b = zeros(1,1,3)',
    'size(squeeze(b))'
  ],
  'seealso': [
    'concat', 'det', 'diag', 'eye', 'inv', 'ones', 'range', 'size', 'subset', 'trace', 'transpose', 'zeros'
  ]
};

var squeezejs_squeezejs_name = "squeeze";
var squeezejs_squeezejs_category = "Matrix";
var squeezejs_squeezejs_syntax = ["squeeze(x)"];
var squeezejs_squeezejs_description = "Remove inner and outer singleton dimensions from a matrix.";

var squeezejs_squeezejs_examples = [
  "a = zeros(3,2,1)",
  "size(squeeze(a))",
  "b = zeros(1,1,3)",
  "size(squeeze(b))"
];

var squeezejs_squeezejs_seealso = [
  "concat",
  "det",
  "diag",
  "eye",
  "inv",
  "ones",
  "range",
  "size",
  "subset",
  "trace",
  "transpose",
  "zeros"
];

export { squeezejs_squeezejs_name as name, squeezejs_squeezejs_category as category, squeezejs_squeezejs_syntax as syntax, squeezejs_squeezejs_description as description, squeezejs_squeezejs_examples as examples, squeezejs_squeezejs_seealso as seealso };

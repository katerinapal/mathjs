var zerosjs_zerosjs = {
  'name': 'zeros',
  'category': 'Matrix',
  'syntax': [
    'zeros(m)',
    'zeros(m, n)',
    'zeros(m, n, p, ...)',
    'zeros([m])',
    'zeros([m, n])',
    'zeros([m, n, p, ...])',
    'zeros'
  ],
  'description': 'Create a matrix containing zeros.',
  'examples': [
    'zeros(3)',
    'zeros(3, 5)',
    'a = [1, 2, 3; 4, 5, 6]',
    'zeros(size(a))'
  ],
  'seealso': [
    'concat', 'det', 'diag', 'eye', 'inv', 'ones', 'range', 'size', 'squeeze', 'subset', 'trace', 'transpose'
  ]
};

var zerosjs_zerosjs_name = "zeros";
var zerosjs_zerosjs_category = "Matrix";

var zerosjs_zerosjs_syntax = [
  "zeros(m)",
  "zeros(m, n)",
  "zeros(m, n, p, ...)",
  "zeros([m])",
  "zeros([m, n])",
  "zeros([m, n, p, ...])",
  "zeros"
];

var zerosjs_zerosjs_description = "Create a matrix containing zeros.";
var zerosjs_zerosjs_examples = ["zeros(3)", "zeros(3, 5)", "a = [1, 2, 3; 4, 5, 6]", "zeros(size(a))"];

var zerosjs_zerosjs_seealso = [
  "concat",
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
  "transpose"
];

export { zerosjs_zerosjs_name as name, zerosjs_zerosjs_category as category, zerosjs_zerosjs_syntax as syntax, zerosjs_zerosjs_description as description, zerosjs_zerosjs_examples as examples, zerosjs_zerosjs_seealso as seealso };

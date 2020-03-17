var matrixjs_matrixjs = {
  'name': 'matrix',
  'category': 'Construction',
  'syntax': [
    '[]',
    '[a1, b1, ...; a2, b2, ...]',
    'matrix()',
    'matrix("dense")',
    'matrix([...])'
  ],
  'description':
      'Create a matrix.',
  'examples': [
    '[]',
    '[1, 2, 3]',
    '[1, 2, 3; 4, 5, 6]',
    'matrix()',
    'matrix([3, 4])',
    'matrix([3, 4; 5, 6], "sparse")',
    'matrix([3, 4; 5, 6], "sparse", "number")'
  ],
  'seealso': [
    'bignumber', 'boolean', 'complex', 'index', 'number', 'string', 'unit', 'sparse'
  ]
};

var matrixjs_matrixjs_name = "matrix";
var matrixjs_matrixjs_category = "Construction";

var matrixjs_matrixjs_syntax = [
  "[]",
  "[a1, b1, ...; a2, b2, ...]",
  "matrix()",
  "matrix(\"dense\")",
  "matrix([...])"
];

var matrixjs_matrixjs_description = "Create a matrix.";

var matrixjs_matrixjs_examples = [
  "[]",
  "[1, 2, 3]",
  "[1, 2, 3; 4, 5, 6]",
  "matrix()",
  "matrix([3, 4])",
  "matrix([3, 4; 5, 6], \"sparse\")",
  "matrix([3, 4; 5, 6], \"sparse\", \"number\")"
];

var matrixjs_matrixjs_seealso = [
  "bignumber",
  "boolean",
  "complex",
  "index",
  "number",
  "string",
  "unit",
  "sparse"
];

export { matrixjs_matrixjs_name as name, matrixjs_matrixjs_category as category, matrixjs_matrixjs_syntax as syntax, matrixjs_matrixjs_description as description, matrixjs_matrixjs_examples as examples, matrixjs_matrixjs_seealso as seealso };

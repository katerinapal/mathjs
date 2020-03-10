var indexjs_exportedObj = {
  'name': 'index',
  'category': 'Construction',
  'syntax': [
    '[start]',
    '[start:end]',
    '[start:step:end]',
    '[start1, start 2, ...]',
    '[start1:end1, start2:end2, ...]',
    '[start1:step1:end1, start2:step2:end2, ...]'
  ],
  'description':
      'Create an index to get or replace a subset of a matrix',
  'examples': [
    '[]',
    '[1, 2, 3]',
    'A = [1, 2, 3; 4, 5, 6]',
    'A[1, :]',
    'A[1, 2] = 50',
    'A[0:2, 0:2] = ones(2, 2)'
  ],
  'seealso': [
    'bignumber', 'boolean', 'complex', 'matrix,', 'number', 'range', 'string', 'unit'
  ]
};

var indexjs_exportedObj_name = "index";
var indexjs_exportedObj_category = "Construction";

var indexjs_exportedObj_syntax = [
  "[start]",
  "[start:end]",
  "[start:step:end]",
  "[start1, start 2, ...]",
  "[start1:end1, start2:end2, ...]",
  "[start1:step1:end1, start2:step2:end2, ...]"
];

var indexjs_exportedObj_description = "Create an index to get or replace a subset of a matrix";

var indexjs_exportedObj_examples = [
  "[]",
  "[1, 2, 3]",
  "A = [1, 2, 3; 4, 5, 6]",
  "A[1, :]",
  "A[1, 2] = 50",
  "A[0:2, 0:2] = ones(2, 2)"
];

var indexjs_exportedObj_seealso = [
  "bignumber",
  "boolean",
  "complex",
  "matrix,",
  "number",
  "range",
  "string",
  "unit"
];

export { indexjs_exportedObj_name as name, indexjs_exportedObj_category as category, indexjs_exportedObj_syntax as syntax, indexjs_exportedObj_description as description, indexjs_exportedObj_examples as examples, indexjs_exportedObj_seealso as seealso };

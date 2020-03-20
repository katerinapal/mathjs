var filterjs_filterjs = {
  'name': 'filter',
  'category': 'Matrix',
  'syntax': [
    'filter(x, test)'
  ],
  'description': 'Filter items in a matrix.',
  'examples': [
    'isPositive(x) = x > 0',
    'filter([6, -2, -1, 4, 3], isPositive)',
    'filter([6, -2, 0, 1, 0], x != 0)'
  ],
  'seealso': ['sort', 'map', 'forEach']
};

var filterjs_filterjs_name = "filter";
var filterjs_filterjs_category = "Matrix";
var filterjs_filterjs_syntax = ["filter(x, test)"];
var filterjs_filterjs_description = "Filter items in a matrix.";

var filterjs_filterjs_examples = [
  "isPositive(x) = x > 0",
  "filter([6, -2, -1, 4, 3], isPositive)",
  "filter([6, -2, 0, 1, 0], x != 0)"
];

var filterjs_filterjs_seealso = ["sort", "map", "forEach"];
export { filterjs_filterjs_name as name, filterjs_filterjs_category as category, filterjs_filterjs_syntax as syntax, filterjs_filterjs_description as description, filterjs_filterjs_examples as examples, filterjs_filterjs_seealso as seealso };

var mapjs_mapjs = {
  'name': 'map',
  'category': 'Matrix',
  'syntax': [
    'map(x, callback)'
  ],
  'description': 'Create a new matrix or array with the results of the callback function executed on each entry of the matrix/array.',
  'examples': [
    'map([1, 2, 3], function(val) { return value * value })'
  ],
  'seealso': ['filter', 'forEach']
};

var mapjs_mapjs_name = "map";
var mapjs_mapjs_category = "Matrix";
var mapjs_mapjs_syntax = ["map(x, callback)"];
var mapjs_mapjs_description = "Create a new matrix or array with the results of the callback function executed on each entry of the matrix/array.";
var mapjs_mapjs_examples = ["map([1, 2, 3], function(val) { return value * value })"];
var mapjs_mapjs_seealso = ["filter", "forEach"];
export { mapjs_mapjs_name as name, mapjs_mapjs_category as category, mapjs_mapjs_syntax as syntax, mapjs_mapjs_description as description, mapjs_mapjs_examples as examples, mapjs_mapjs_seealso as seealso };

var typedjs_typedjs = {
  'name': 'typed',
  'category': 'Core',
  'syntax': [
    'typed(signatures)',
    'typed(name, signatures)'
  ],
  'description': 'Create a typed function.',
  'examples': [
    'double = typed({ "number, number": f(x)=x+x })',
    'double(2)',
    'double("hello")'
  ],
  'seealso': []
};

var typedjs_typedjs_name = "typed";
var typedjs_typedjs_category = "Core";
var typedjs_typedjs_syntax = ["typed(signatures)", "typed(name, signatures)"];
var typedjs_typedjs_description = "Create a typed function.";

var typedjs_typedjs_examples = [
  "double = typed({ \"number, number\": f(x)=x+x })",
  "double(2)",
  "double(\"hello\")"
];

var typedjs_typedjs_seealso = [];
export { typedjs_typedjs_name as name, typedjs_typedjs_category as category, typedjs_typedjs_syntax as syntax, typedjs_typedjs_description as description, typedjs_typedjs_examples as examples, typedjs_typedjs_seealso as seealso };

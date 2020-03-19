#!/usr/bin/env node
import { indexjs as index_indexjsjs } from "../index";
import fs from "fs";
import readline from "readline";
var scope = {};

var PRECISION = 14; // decimals

/**
 * Helper function to format a value. Regular numbers will be rounded
 * to 14 digits to prevent round-off errors from showing up.
 * @param {*} value
 */
function format(value) {
  return index_indexjsjs.format(value, {
    fn: function (value) {
      if (typeof value === 'number') {
        // round numbers
        return index_indexjsjs.format(value, PRECISION);
      }
      else {
        return index_indexjsjs.format(value);
      }
    }
  });
}

/**
 * auto complete a text
 * @param {String} text
 * @return {[Array, String]} completions
 */
function completer (text) {
  var name;
  var matches = [];
  var m = /[a-zA-Z_0-9]+$/.exec(text);
  if (m) {
    var keyword = m[0];

    // scope variables
    for (var def in scope) {
      if (scope.hasOwnProperty(def)) {
        if (def.indexOf(keyword) == 0) {
          matches.push(def);
        }
      }
    }

    // commandline keywords
    ['exit', 'quit', 'clear'].forEach(function (cmd) {
      if (cmd.indexOf(keyword) == 0) {
        matches.push(cmd);
      }
    });

    // math functions and constants
    var ignore = ['expr', 'type'];
    for (var func in index_indexjsjs) {
      if (index_indexjsjs.hasOwnProperty(func)) {
        if (func.indexOf(keyword) == 0 && ignore.indexOf(func) == -1) {
          matches.push(func);
        }
      }
    }

    // units
    var Unit = index_indexjsjs.type.Unit;
    for (name in Unit.UNITS) {
      if (Unit.UNITS.hasOwnProperty(name)) {
        if (name.indexOf(keyword) == 0) {
          matches.push(name);
        }
      }
    }
    for (name in Unit.PREFIXES) {
      if (Unit.PREFIXES.hasOwnProperty(name)) {
        var prefixes = Unit.PREFIXES[name];
        for (var prefix in prefixes) {
          if (prefixes.hasOwnProperty(prefix)) {
            if (prefix.indexOf(keyword) == 0) {
              matches.push(prefix);
            }
            else if (keyword.indexOf(prefix) == 0) {
              var unitKeyword = keyword.substring(prefix.length);
              for (var n in Unit.UNITS) {
                if (Unit.UNITS.hasOwnProperty(n)) {
                  if (n.indexOf(unitKeyword) == 0 &&
                      Unit.isValuelessUnit(prefix + n)) {
                    matches.push(prefix + n);
                  }
                }
              }
            }
          }
        }
      }
    }

    // remove duplicates
    matches = matches.filter(function(elem, pos, arr) {
      return arr.indexOf(elem) == pos;
    });
  }

  return [matches, keyword];
}

/**
 * Run stream, read and evaluate input and stream that to output.
 * Text lines read from the input are evaluated, and the results are send to
 * the output.
 * @param input   Input stream
 * @param output  Output stream
 * @param mode    Output mode
 * @param parenthesis Parenthesis option
 */
function runStream (input, output, mode, parenthesis) {
  var rl = readline.createInterface({
    input: input || process.stdin,
    output: output || process.stdout,
    completer: completer
  });

  if (rl.output.isTTY) {
    rl.setPrompt('> ');
    rl.prompt();
  }

  // TODO: automatic insertion of 'ans' before operators like +, -, *, /

  rl.on('line', function(line) {
    var expr = line.trim();

    switch (expr.toLowerCase()) {
      case 'quit':
      case 'exit':
        // exit application
        rl.close();
        break;
      case 'clear':
        // clear memory
        scope = {};
        console.log('memory cleared');

        // get next input
        if (rl.output.isTTY) {
          rl.prompt();
        }
        break;
      default:
        if (!expr) {
          break;
        }
        switch (mode) {
          case 'eval':
            // evaluate expression
            try {
              var node = index_indexjsjs.parse(expr);
              var res = node.eval(scope);

              if (res && res.isResultSet) {
                // we can have 0 or 1 results in the ResultSet, as the CLI
                // does not allow multiple expressions separated by a return
                res = res.entries[0];
                node = node.blocks
                    .filter(function (entry) { return entry.visible; })
                    .map(function (entry) { return entry.node })[0];
              }

              if (node) {
                if (node.isAssignmentNode) {
                  var name = findSymbolName(node);
                  if (name != null) {
                    scope.ans = scope[name];
                    console.log(name + ' = ' + format(scope[name]));
                  }
                  else {
                    scope.ans = res;
                    console.log(format(res));
                  }
                }
                else if (res instanceof index_indexjsjs.type.Help) {
                  console.log(res.toString());
                }
                else {
                  scope.ans = res;
                  console.log(format(res));
                }
              }
            }
            catch (err) {
              console.log(err.toString());
            }
            break;

          case 'string':
            try {
              var string = index_indexjsjs.parse(expr).toString({parenthesis: parenthesis});
              console.log(string);
            }
            catch (err) {
              console.log(err.toString());
            }
            break;

          case 'tex':
            try {
              var tex = index_indexjsjs.parse(expr).toTex({parenthesis: parenthesis});
              console.log(tex);
            }
            catch (err) {
              console.log(err.toString());
            }
            break;
        }
    }

    // get next input
    if (rl.output.isTTY) {
      rl.prompt();
    }
  });

  rl.on('close', function() {
    console.log();
    process.exit(0);
  });
}

/**
 * Find the symbol name of an AssignmentNode. Recurses into the chain of
 * objects to the root object.
 * @param {AssignmentNode} node
 * @return {string | null} Returns the name when found, else returns null.
 */
function findSymbolName (node) {
  var n = node;

  while (n) {
    if (n.isSymbolNode) {
      return n.name;
    }
    n = n.object;
  }

  return null;
}

/**
 * Output application version number.
 * Version number is read version from package.json.
 */
function outputVersion () {
  fs.readFile(__dirname + '/../package.json', function (err, data) {
    if (err) {
      console.log(err.toString());
    }
    else {
      var pkg = JSON.parse(data);
      var version = pkg && pkg.version ? pkg.version : 'unknown';
      console.log(version);
    }
    process.exit(0);
  });
}

/**
 * Output a help message
 */
function outputHelp() {
  console.log('math.js');
  console.log('http://mathjs.org');
  console.log();
  console.log('Math.js is an extensive math library for JavaScript and Node.js. It features ');
  console.log('real and complex numbers, units, matrices, a large set of mathematical');
  console.log('functions, and a flexible expression parser.');
  console.log();
  console.log('Usage:');
  console.log('    mathjs [scriptfile(s)] {OPTIONS}');
  console.log();
  console.log('Options:');
  console.log('    --version, -v       Show application version');
  console.log('    --help,    -h       Show this message');
  console.log('    --tex               Generate LaTeX instead of evaluating');
  console.log('    --string            Generate string instead of evaluating');
  console.log('    --parenthesis=      Set the parenthesis option to');
  console.log('                        either of "keep", "auto" and "all"');
  console.log();
  console.log('Example usage:');
  console.log('    mathjs                                Open a command prompt');
  console.log('    mathjs script.txt                     Run a script file');
  console.log('    mathjs script.txt script2.txt         Run two script files');
  console.log('    mathjs script.txt > results.txt       Run a script file, output to file');
  console.log('    cat script.txt | mathjs               Run input stream');
  console.log('    cat script.txt | mathjs > results.txt Run input stream, output to file');
  console.log();
  process.exit(0);
}

/**
 * Process input and output, based on the command line arguments
 */
var scripts = []; //queue of scripts that need to be processed
var mode = 'eval'; //one of 'eval', 'tex' or 'string'
var parenthesis = 'keep';
var version = false;
var help = false;

process.argv.forEach(function (arg, index) {
  if (index < 2) {
    return;
  }

  switch (arg) {
    case '-v':
    case '--version':
      version = true;
      break;

    case '-h':
    case '--help':
      help = true;
      break;

    case '--tex':
      mode = 'tex';
      break;

    case '--string':
      mode = 'string';
      break;

    case '--parenthesis=keep':
      parenthesis = 'keep';
      break;

    case '--parenthesis=auto':
      parenthesis = 'auto';
      break;

    case '--parenthesis=all':
      parenthesis = 'all';
      break;

    // TODO: implement configuration via command line arguments

    default:
      scripts.push(arg);
  }
});

if (version) {
  outputVersion();
}
else if (help) {
  outputHelp();
}
else if (scripts.length === 0) {
  // run a stream, can be user input or pipe input
  runStream(process.stdin, process.stdout, mode, parenthesis);
}
else {
  //work through the queue of scripts
  scripts.forEach(function (arg) {
    // run a script file
    runStream(fs.createReadStream(arg), process.stdout, mode, parenthesis);
  });
}

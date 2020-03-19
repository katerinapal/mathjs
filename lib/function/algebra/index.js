import * as decompositionlup_obj from "./decomposition/lup";
import * as decompositionslu_obj from "./decomposition/slu";
import * as solverlsolve_obj from "./solver/lsolve";
import * as solverlusolve_obj from "./solver/lusolve";
import * as solverusolve_obj from "./solver/usolve";

var indexjs_indexjs = [
  decompositionlup_obj,
  decompositionslu_obj,

  solverlsolve_obj,
  solverlusolve_obj,
  solverusolve_obj
];

export { indexjs_indexjs as indexjs };

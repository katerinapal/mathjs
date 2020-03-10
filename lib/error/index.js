import { ArgumentsError as ArgumentsError_ArgumentsError } from "./ArgumentsError";
import { DimensionError as DimensionError_DimensionError } from "./DimensionError";
import { IndexError as IndexError_IndexError } from "./IndexError";
'use strict';

var ArgumentsError = ArgumentsError_ArgumentsError;
var DimensionError = DimensionError_DimensionError;
var IndexError = IndexError_IndexError;

var indexjs_exportedObj = [
  {
    name: 'ArgumentsError', path: 'error',
    factory: function () {
      return ArgumentsError_ArgumentsError;
    }
  },
  {
    name: 'DimensionError',
    path: 'error',
    factory: function () {
      return DimensionError_DimensionError;
    }
  },
  {
    name: 'IndexError',
    path: 'error',
    factory: function () {
      return IndexError_IndexError;
    }
  }
];

export { indexjs_exportedObj as indexjs };

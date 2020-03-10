import { ArgumentsError as ArgumentsError_ArgumentsErrorjs } from "./ArgumentsError";
import { DimensionError as DimensionError_DimensionErrorjs } from "./DimensionError";
import { IndexError as IndexError_IndexErrorjs } from "./IndexError";
'use strict';

var ArgumentsError = ArgumentsError_ArgumentsErrorjs;
var DimensionError = DimensionError_DimensionErrorjs;
var IndexError = IndexError_IndexErrorjs;

var indexjs_exportedObj = [
  {
    name: 'ArgumentsError', path: 'error',
    factory: function () {
      return ArgumentsError_ArgumentsErrorjs;
    }
  },
  {
    name: 'DimensionError',
    path: 'error',
    factory: function () {
      return DimensionError_DimensionErrorjs;
    }
  },
  {
    name: 'IndexError',
    path: 'error',
    factory: function () {
      return IndexError_IndexErrorjs;
    }
  }
];

export { indexjs_exportedObj as indexjs };

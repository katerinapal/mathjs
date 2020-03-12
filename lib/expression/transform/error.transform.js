"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform = undefined;

var _IndexError = require("../../error/IndexError");

var transform_exportedObj = function transform_exportedObj(err) {
  if (err && err.isIndexError) {
    return new _IndexError.IndexError(err.index + 1, err.min + 1, err.max !== undefined ? err.max + 1 : undefined);
  }

  return err;
};

exports.transform = transform_exportedObj;

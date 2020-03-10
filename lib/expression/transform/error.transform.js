import { IndexError as errorIndexError_IndexError } from "../../error/IndexError";
var IndexError = errorIndexError_IndexError;

var transform_exportedObj = function (err) {
  if (err && err.isIndexError) {
    return new errorIndexError_IndexError(
        err.index + 1,
        err.min + 1,
        err.max !== undefined ? err.max + 1 : undefined);
  }

  return err;
};

export { transform_exportedObj as transform };

import { IndexError as IndexError_IndexErrorjs } from "../../error/IndexError";
var IndexError = IndexError_IndexErrorjs;

var transform_exportedObj = function (err) {
  if (err && err.isIndexError) {
    return new IndexError_IndexErrorjs(
        err.index + 1,
        err.min + 1,
        err.max !== undefined ? err.max + 1 : undefined);
  }

  return err;
};

export { transform_exportedObj as transform };

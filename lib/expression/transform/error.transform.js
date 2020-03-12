import { IndexError as errorIndexError_IndexErrorjs } from "../../error/IndexError";

var transform_exportedObj = function (err) {
  if (err && err.isIndexError) {
    return new errorIndexError_IndexErrorjs(
        err.index + 1,
        err.min + 1,
        err.max !== undefined ? err.max + 1 : undefined);
  }

  return err;
};

export { transform_exportedObj as transform };

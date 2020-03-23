import { IndexError as errorIndexError_IndexErrorjs } from "../../error/IndexError";

var transform_transform = function (err) {
  if (err && err.isIndexError) {
    return new errorIndexError_IndexErrorjs(
        err.index + 1,
        err.min + 1,
        err.max !== undefined ? err.max + 1 : undefined);
  }

  return err;
};

export { transform_transform as transform };

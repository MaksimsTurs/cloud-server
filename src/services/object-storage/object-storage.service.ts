import getAll from "./get-all.service";
import getById from "./get-by-id.service";
import save from "./save.service";
import copy from "./copy.service";
import move from "./move.service";
import remove from "./remove.service";
import create from "./create.service";
import upload from "./upload.service";

export default {
  getAll,
  getById,
  copy,
  move,
  remove,
  create,
  save,
  upload,
} as const;

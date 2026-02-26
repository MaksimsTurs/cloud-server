import read from "./read.service";
import copy from "./copy.service";
import move from "./move.service";
import remove from "./remove.service";
import create from "./create.service";

export default {
  read,
  copy,
  move,
  remove,
  create
} as const;

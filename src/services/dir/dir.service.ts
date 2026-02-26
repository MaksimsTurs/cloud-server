import read from "./read.service";
import copy from "./copy.service";
import move from "./move.service";
import remove from "./remove.service";

export default {
  read,
  copy,
  move,
  remove
} as const;

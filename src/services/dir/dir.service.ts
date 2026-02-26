import read from "./read.service";
import copy from "./copy.service";
import move from "./move.service";

export default {
  read,
  copy,
  move
} as const;

import clamp from "./clamp.util";

// 2 best 31 worst
export default function precentQualityToJpg(precent: number): number {
  const current: number = 31 - (31 * (precent / 100));
  return clamp(current, 31, 2);
};

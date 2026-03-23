export default function clamp(current: number, max: number, min: number): number {
  if(current < min) {
    return min;
  }

  if(current > max) {
    return max;
  }

  return current;
};

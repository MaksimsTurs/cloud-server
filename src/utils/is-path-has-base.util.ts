export default function isPathHasBase(base: string, path: string): boolean {
  return path.startsWith(base);
};

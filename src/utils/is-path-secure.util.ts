export default function isPathSecure(path: string): boolean {
  return /^\/?([A-Za-z0-9])\/?.+/.test(path);
};

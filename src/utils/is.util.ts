import FILE_EXT from "../const/FILE_EXT.const";

export const isFileSafe = (ext?: string): boolean => !FILE_EXT.UNSAFE.has(ext || "");

export const isMediaFile = (mimeType: string): boolean => {
  return(
    /audio\/*/.test(mimeType) ||
    /image\/*/.test(mimeType) ||
    /video\/*/.test(mimeType)
  );
};

export const isPathSafe = (basePath: string, path: string): boolean => /^\/?([A-Za-z0-9])\/?.+/.test(path) && path.startsWith(basePath);

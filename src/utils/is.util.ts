import MALICIOUS_FILES from "../const/MALICIOUS_FILES.const";

export const isUndefined = (something: any): something is undefined => something === undefined;

export const isNull = (something: any): something is null => something === null;

export const isStrEmpty = (something: string): boolean => !something.length;

export const isMediaFile = (mimeType: string): boolean => {
  return(
    /audio\/*/.test(mimeType) ||
    /image\/*/.test(mimeType) ||
    /video\/*/.test(mimeType)
  );
};

export const isMimeTypeSafe = (mimeType: string): boolean => !MALICIOUS_FILES.MIME_TYPES.has(mimeType);

export const isExtentionSafe = (extention: string): boolean => !MALICIOUS_FILES.EXTENTIONS.has(extention);

export const isPathSafe = (basePath: string, path: string): boolean => /^\/?([A-Za-z0-9])\/?.+/.test(path) && path.startsWith(basePath);

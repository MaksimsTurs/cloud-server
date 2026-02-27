import UNSUPPORTED_FILE_FORMATS from "../const/UNSUPPORTED-FILE-FORMATS.const";

export default function isSupportedFileFormat(extention: string, mimeType: string): boolean {
  if(!mimeType) {
    if(!extention) {
      return false;
    }

    return !UNSUPPORTED_FILE_FORMATS.has(extention);
  }

  if(!extention) {
    return !UNSUPPORTED_FILE_FORMATS.has(mimeType);
  }

  return !UNSUPPORTED_FILE_FORMATS.has(extention) && !UNSUPPORTED_FILE_FORMATS.has(mimeType);
};

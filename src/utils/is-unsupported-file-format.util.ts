import UNSUPPORTED_FILE_FORMATS from "../const/UNSUPPORTED-FILE-FORMATS.const";

export default function isSupportedFileFormat(extention: string): boolean {
  return !UNSUPPORTED_FILE_FORMATS.has(extention);
};

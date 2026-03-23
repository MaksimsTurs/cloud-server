export default function extentionToFFmpegFormat(extention: string): string {
  if(extention === "jpeg" || extention === "jpg") {
    return "mjpeg";
  }

  if(extention === "png") {
    return "apng";
  }

  return extention;
};

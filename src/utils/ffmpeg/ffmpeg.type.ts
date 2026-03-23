export type FFmpegProcessOptions = {
  webp?: WebpProcessOptions
  jpg?: JpgProcessOptions
  jpeg?: JpegProcessOptions
  png?: PngProcessOptions
  mp4?: Mp4ProcessOptions
};

type WebpProcessOptions = {
  quality?: number
  lossless?: number
  level?: number
};

type JpgProcessOptions = {
  quality?: number
};

type JpegProcessOptions = {
  quality?: number
};

type PngProcessOptions = {
  quality?: number
};

type Mp4ProcessOptions = {
  preset?: string
  vcodec?: string
  crf?: number
};

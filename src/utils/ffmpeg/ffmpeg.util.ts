import type { FFmpegProcessOptions } from "./ffmpeg.type";

import precentQualityToJpg from "./utils/precent-quality-to-Jpg.util";
import precentQualityToPngCompressionLevel from "./utils/precent-quality-to-png-compression-level.util";
import extentionToFFmpegFormat from "./utils/extention-to-ffmpeg-format.util";
import execCmd from "./utils/exec-cmd.util";

export default function ffmpeg(input: string) {
  const cmd: string[] = [];

  cmd.push(`ffmpeg -i ${input}`);
  
  return {
    resize: function(width?: number, height?: number) {
      cmd.push(`-vf scale=${width || -1}:${height || -1}`);
      return this;
    },
    process: function(options: FFmpegProcessOptions) {
      if(options.mp4) {
        const { preset, vcodec, crf } = options.mp4;
        
        if(preset) {
          cmd.push(`-preset ${preset}`);
        }
  
        if(vcodec) {
          cmd.push(`-vcodec ${vcodec}`);
        }

        if(crf) {
          cmd.push(`-crf ${crf}`);
        }
      } else if(options.jpeg || options.jpg) {
        const quality: number = options.jpeg?.quality || options.jpg?.quality || 2;
        cmd.push(`-compression_level ${precentQualityToJpg(quality)}`)
      } else if(options.png) {
        const { quality } = options.png;

        cmd.push(`-compression_level ${precentQualityToPngCompressionLevel(quality || 0)}`)
      } else if(options.webp) {
        const { quality, lossless, level } = options.webp;

        if(quality) {
          cmd.push(`-c:v libwebp -quality ${quality}`);
        }

        if(lossless) {
          cmd.push("-lossless 1");
        }

        if(level) {
          cmd.push(`-compression_level ${level}`);
        }
      }

      return this;
    },
    outputFormatFromExtention: function(extention: string) {
      cmd.push(`-f ${extentionToFFmpegFormat(extention)}`);
      return this;
    },
    outputFile: async function(path: string) {
      cmd.push(path);
      await execCmd(cmd);
    }
  }
};

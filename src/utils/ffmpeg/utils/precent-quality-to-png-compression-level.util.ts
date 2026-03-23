// 0 no compression 9 max compression
export default function precentQualityToPngCompressionLevel(precent: number): number {
  if(precent === 0) {
    return 0;
  }

  return Math.floor((precent / 100) * 9);
};

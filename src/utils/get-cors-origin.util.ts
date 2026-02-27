export default function getCorsOrigin(): string {
  return process.env.MODE == "dev" ? process.env.DEV_CORS as string : process.env.PROD_CORS as string;
};

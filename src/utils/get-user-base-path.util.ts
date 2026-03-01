export default function getUserBasePath(): string {
  const mode: string = process.env.MODE as string;
  const devBasePath: string = process.env.DEV_BASE_PATH as string;
  const prodBasePath: string = process.env.PROD_BASE_PATH as string;

  return mode === "dev" ? devBasePath : prodBasePath;
};

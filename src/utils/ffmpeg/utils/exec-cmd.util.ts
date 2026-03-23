import { exec } from "node:child_process";

export default async function execCmd(cmd: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(cmd.join(" "), (error) => {
      if(error) {
        reject(error);
      } else {
        resolve(undefined);
      }
    });
  });
}

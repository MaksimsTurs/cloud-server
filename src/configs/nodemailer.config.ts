import nodemailer from "nodemailer";

import { serverConfigs } from "../index.ts";

export default function createEmailTransporter() {
  return nodemailer.createTransport({
    host: serverConfigs.NODEMAILER_HOST,
    port: serverConfigs.NODEMAILER_PORT,
    secure: true,
    auth: {
      user: serverConfigs.NODEMAILER_USER,
      pass: serverConfigs.NODEMAILER_PASSWORD
    }
  });
};

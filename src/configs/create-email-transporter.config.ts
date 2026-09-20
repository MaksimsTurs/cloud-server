import type { Mail, SMTPSentMessageInfo } from "nodemailer";
import type { ApplicationConf } from "../Application.type";

import nodemailer from "nodemailer";

export type EmailTransporter = Mail<SMTPSentMessageInfo>

export default function createEmailTransporter(conf: ApplicationConf): EmailTransporter {
  return nodemailer.createTransport({
    host: conf.NODEMAILER_HOST,
    port: conf.NODEMAILER_PORT,
    secure: true,
    auth: {
      user: conf.NODEMAILER_USER,
      pass: conf.NODEMAILER_PASSWORD
    }
  });
};

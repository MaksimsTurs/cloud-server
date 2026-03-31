import type { User } from "../../index.type";

import nodemailer from "nodemailer";

import { generateEmailConfirmationToken } from "../../utils/jwt/jwt.util";
import generateConfirmEmail from "../../utils/generate-confirm-email.util";

import { serverConfigs } from "../../index.ts";

const transporter = nodemailer.createTransport({
  host: serverConfigs.NODEMAILER_HOST,
  port: serverConfigs.NODEMAILER_PORT,
  secure: true,
  auth: {
    user: serverConfigs.NODEMAILER_USER,
    pass: serverConfigs.NODEMAILER_PASSWORD
  }
});

export default async function sendConfirmEmail(user: User): Promise<void> {
  const token: string = generateEmailConfirmationToken({ id: user.id });
  await transporter.sendMail({
    to: user.email,
    from: serverConfigs.NODEMAILER_USER,
    subject: "Confirm E - mail",
    html: generateConfirmEmail(token)
  });
};

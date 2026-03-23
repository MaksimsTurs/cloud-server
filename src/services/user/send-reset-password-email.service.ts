import type { User } from "../../index.type";

import nodemailer from "nodemailer";

import { generateResetPasswordToken } from "../../utils/jwt/jwt.util";
import generateResetPasswordEmail from "../../utils/generate-reset-password-email.util";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "velma.abshire29@ethereal.email",
    pass: "aF8hwNFJBgd5fVCQfM"
  }
});

export default async function sendResetPasswordEmail(user: User): Promise<void> {
  const token: string = generateResetPasswordToken({ id: user.id });
  await transporter.sendMail({
    to: user.email,
    from: "test@gmail.com",
    subject: "Reset password",
    html: generateResetPasswordEmail(token)
  });
};

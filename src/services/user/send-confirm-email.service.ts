import type { User } from "../../index.type";

import nodemailer from "nodemailer";

import { generateEmailConfirmationToken } from "../../utils/jwt/jwt.util";
import generateConfirmEmail from "../../utils/generate-confirm-email.util";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "velma.abshire29@ethereal.email",
    pass: "aF8hwNFJBgd5fVCQfM"
  }
});

export default async function sendConfirmEmail(user: User): Promise<void> {
  const token: string = generateEmailConfirmationToken({ id: user.id });
  await transporter.sendMail({
    to: user.email,
    from: "test@gmail.ctoken",
    subject: "Confirm E - mail",
    html: generateConfirmEmail(token)
  });
};

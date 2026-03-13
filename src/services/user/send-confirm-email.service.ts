import type { User } from "../../index.type";

import nodemailer from "nodemailer";

import { generateEmailConformationToken } from "../../utils/jwt/jwt.util";
import generateConfirmationEmail from "../../utils/generate-confirmation-email.util";

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'colton36@ethereal.email',
    pass: 'fgYsF8QEA9rXug8ekB'
  }
});

export default async function sendConfirmEmail(user: User): Promise<void> {
  const emailConformationToken: string = generateEmailConformationToken({ id: user.id });

  await transporter.sendMail({
    from: "test@gmail.com",
    to: user.email,
    subject: "Confirm Registration",
    html: generateConfirmationEmail(emailConformationToken)
  });
};

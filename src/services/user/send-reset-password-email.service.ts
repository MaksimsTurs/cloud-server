import type { User } from "../../index.type";

import { generateResetPasswordToken } from "../../utils/jwt/jwt.util";
import generateResetPasswordEmail from "../../utils/generate-reset-password-email.util";

import app from "../../Application";

export default async function sendResetPasswordEmail(user: User): Promise<void> {
  const token: string = generateResetPasswordToken({ id: user.id });
  const { conf, emailTransporter } = app.context;

  await emailTransporter.sendMail({
    to: user.email,
    from: conf.NODEMAILER_USER,
    subject: "Reset password",
    html: generateResetPasswordEmail(token)
  });
};

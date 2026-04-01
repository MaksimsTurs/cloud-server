import type { User } from "../../index.type";

import { generateResetPasswordToken } from "../../utils/jwt/jwt.util";
import generateResetPasswordEmail from "../../utils/generate-reset-password-email.util";

import { serverConfigs, emailTransporter } from "../../index.ts";

export default async function sendResetPasswordEmail(user: User): Promise<void> {
  const token: string = generateResetPasswordToken({ id: user.id });
  
  await emailTransporter.sendMail({
    to: user.email,
    from: serverConfigs.NODEMAILER_USER,
    subject: "Reset password",
    html: generateResetPasswordEmail(token)
  });
};

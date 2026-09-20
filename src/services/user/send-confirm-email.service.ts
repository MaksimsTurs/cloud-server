import type { User } from "../../index.type";

import { generateConfirmEmailToken } from "../../utils/jwt/jwt.util";
import generateConfirmEmail from "../../utils/generate-confirm-email.util";

import app from "../../Application.ts";

export default async function sendConfirmEmail(user: User): Promise<void> {
  const token: string = generateConfirmEmailToken({ id: user.id });
  const { conf, emailTransporter } = app.context;

  await emailTransporter.sendMail({
    to: user.email,
    from: conf.NODEMAILER_USER,
    subject: "Confirm E - mail",
    html: generateConfirmEmail(token)
  });
};

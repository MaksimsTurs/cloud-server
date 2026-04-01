import type { User } from "../../index.type";

import { generateConfirmEmailToken } from "../../utils/jwt/jwt.util";
import generateConfirmEmail from "../../utils/generate-confirm-email.util";

import { serverConfigs, emailTransporter } from "../../index.ts";

export default async function sendConfirmEmail(user: User): Promise<void> {
  const token: string = generateConfirmEmailToken({ id: user.id });

  await emailTransporter.sendMail({
    to: user.email,
    from: serverConfigs.NODEMAILER_USER,
    subject: "Confirm E - mail",
    html: generateConfirmEmail(token)
  });
};

import vine from "@vinejs/vine";

import COOKIE from "./COOKIE.const";

vine.convertEmptyStringsToNull = true;

export default {
  UNTRUSTED_JWT_PAYLOAD: vine.create({
    id: vine
      .string()
      .uuid({ version: [4] })
  }),
  AUTH: vine.create({
    [COOKIE.ACCESS_TOKEN_KEY]: vine
      .string()
      .jwt()
      .optional()
  }),
  LOG_UP_BODY: vine.create({
    email: vine
      .string()
      .trim()
      .escape()
      .maxLength(254)
      .email(),
    password: vine
      .string()
      .trim()
      .escape()
      .minLength(12)
      .confirmed({ as: "confirmPassword" }),
    confirmPassword: vine
      .string()
      .trim()
      .escape()
      .minLength(12)
      .sameAs("password")
  })
};

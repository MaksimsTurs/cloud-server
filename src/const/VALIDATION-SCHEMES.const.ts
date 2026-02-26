import vine from "@vinejs/vine";

import COOKIE from "./COOKIE.const";

vine.convertEmptyStringsToNull = true;

export default {
  // Directory route schemes
  DIR_READ: vine.create({
    dir: vine
      .string()
      .trim()
      .escape()
  }),
  DIR_COPY: vine.create({
    from: vine
      .string()
      .trim()
      .escape(),
    into: vine
      .string()
      .trim()
      .escape(),
    items: vine
      .array(vine
            .string()
            .trim()
            .escape())
  }),
  // User route schemes
  LOG_UP: vine.create({
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
  }),
  // Middleware route schemes
  JWT_PAYLOAD: vine.create({
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
};

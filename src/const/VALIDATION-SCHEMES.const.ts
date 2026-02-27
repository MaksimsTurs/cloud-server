import vine from "@vinejs/vine";

import COOKIE from "./COOKIE.const";

vine.convertEmptyStringsToNull = true;

export default {
  // Directory route schemes
  DIR_UPLOAD: vine.create({
    uploadPath: vine
      .string()
      .trim()
      .escape()
  }),
  DIR_CREATE: vine.create({
    name: vine
      .string()
      .trim()
      .escape(),
    inWhichPath: vine
      .string()
      .trim()
      .escape()
  }),
  DIR_READ: vine.create({
    dir: vine
      .string()
      .trim()
      .escape()
  }),
  DIR_REMOVE: vine.create({
    fromPath: vine
      .string()
      .trim()
      .escape(),
    itemNames: vine
      .array(vine
            .string()
            .trim()
            .escape())
    }),
  DIR_MOVE: vine.create({
    fromPath: vine
      .string()
      .trim()
      .escape(),
    intoPath: vine
      .string()
      .trim()
      .escape(),
    itemNames: vine
      .array(vine
            .string()
            .trim()
            .escape())
    }),
  DIR_COPY: vine.create({
    fromPath: vine
      .string()
      .trim()
      .escape(),
    intoPath: vine
      .string()
      .trim()
      .escape(),
    itemNames: vine
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
  LOG_IN: vine.create({
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

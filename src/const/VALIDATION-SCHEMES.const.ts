import vine from "@vinejs/vine";

import COOKIE from "./COOKIE.const";

vine.convertEmptyStringsToNull = true;

const UUIDScheme = vine
  .string()
  .trim()
  .escape()
  .uuid({ version: [4] });
const StorageObjectScheme = vine.object({
  id: UUIDScheme,
  user_id: UUIDScheme,
  mime_type: vine
    .string()
    .trim()
    .escape()
    .optional(),
  parent_id: UUIDScheme
    .clone()
    .optional(), 
  name: vine
    .string()
    .trim()
    .escape(),
  type: vine
    .number()
});
const PasswordScheme = vine
  .string()
  .trim()
  .escape()
  .minLength(12);
const EmailScheme = vine
  .string()
  .trim()
  .escape()
  .email();
const JwtScheme = vine
  .string()
  .jwt();

export default {
  // Directory route schemes
  DIR_UPLOAD: vine.create({
    parentId: UUIDScheme
      .clone()
      .optional()
  }),
  DIR_CREATE: vine.create({
    name: vine
      .string()
      .maxLength(64)
      .trim()
      .escape(),
    parentId: UUIDScheme,
    path: vine
      .string()
      .trim()
      .escape()
  }),
  DIR_READ: vine.create({
    id: UUIDScheme
      .clone()
      .optional()
  }),
  DIR_READ_OBJECT: vine.create({
    id: UUIDScheme
  }),
  DIR_REMOVE: vine.create(vine.record(StorageObjectScheme)),
  DIR_COPY: vine.create({
    parentId: UUIDScheme,
    items: vine.record(StorageObjectScheme)
  }),
  DIR_MOVE: vine.create({
    parentId: UUIDScheme,
    items: vine.record(StorageObjectScheme)
  }),
  // User route schemes
  LOG_IN: vine.create({
    email: EmailScheme, 
    password: PasswordScheme 
  }),
  LOG_UP: vine.create({
    email: EmailScheme,
    password: PasswordScheme
      .clone()
      .confirmed({ as: "confirmPassword" }),
    confirmPassword: PasswordScheme
      .clone()
      .sameAs("password") 
  }),
  REQUEST_RESET_PASSWORD: vine.create({
    email: EmailScheme
  }),
  RESET_PASSWORD: vine.create({
    password: PasswordScheme,
    token: JwtScheme
  }),
  REQUEST_CONFIRM_EMAIL: vine.create({
    [COOKIE.ACCESS_TOKEN_KEY]: JwtScheme
  }),
  CONFIRM_EMAIL: vine.create({
    token: JwtScheme
  }),
  // Middleware route schemes
  JWT_PAYLOAD: vine.create({
    id: UUIDScheme
  }),
  REFRESH_TOKEN: vine.create({
    [COOKIE.ACCESS_TOKEN_KEY]: JwtScheme
  }),
  AUTH: vine.create({
    [COOKIE.REFRESH_TOKEN_KEY]: JwtScheme,
    [COOKIE.ACCESS_TOKEN_KEY]: JwtScheme
  }),
};

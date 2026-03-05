import vine from "@vinejs/vine";

import COOKIE from "./COOKIE.const";

vine.convertEmptyStringsToNull = true;

const StorageObjectScheme = vine.object({
  id: vine
    .string()
    .trim()
    .uuid({ version: [4] }),
  user_id: vine
    .string()
    .trim()
    .uuid({ version: [4] }),
  parent_id: vine
    .string()
    .trim()
    .uuid({ version: [4] })
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
  .maxLength(254)
  .email();
const UUIDScheme = vine
  .string()
  .trim()
  .escape()
  .uuid({ version: [4] });
const JwtScheme = vine
  .string()
  .jwt();

export default {
  // Directory route schemes
  DIR_UPLOAD: vine.create({
    parentId: UUIDScheme
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
  LOG_IN: vine.create({
    email: EmailScheme, 
    password: PasswordScheme 
  }),
  // User route schemes
  LOG_UP: vine.create({
    email: EmailScheme,
    password: PasswordScheme
      .clone()
      .confirmed({ as: "confirmPassword" }),
    confirmPassword: PasswordScheme
      .clone()
      .sameAs("password") 
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

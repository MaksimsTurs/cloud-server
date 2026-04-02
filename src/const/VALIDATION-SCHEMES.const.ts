import type { VineString } from "@vinejs/vine";

import vine from "@vinejs/vine";

import COOKIE from "./COOKIE.const";

vine.convertEmptyStringsToNull = true;

const VineStringScheme: VineString = vine.string().escape().trim();
const VineUUIDV4Scheme: VineString = VineStringScheme.clone().uuid({ version: [4] });
const VinePasswordScheme: VineString = VineStringScheme.clone().minLength(12);
const VineEmailScheme: VineString = VineStringScheme.clone().email();
const VineJwtScheme: VineString = VineStringScheme.clone().jwt();
const VineStorageObjectScheme = vine.object({
  id: VineUUIDV4Scheme.clone(),
  user_id: VineUUIDV4Scheme.clone(),
  mime_type: VineStringScheme.clone().optional(),
  parent_id: VineUUIDV4Scheme.clone().optional(),
  name: VineStringScheme.clone(),
  type: vine.number()
});

export default {
  // Directory route schemes
  DIR_UPLOAD: vine.create({
    parentId: VineUUIDV4Scheme.clone()
  }),
  DIR_UPLOAD_PROCESS_OPTIONS: vine.create({
    name: VineStringScheme.clone().maxLength(64).optional(),
    convertTo: VineStringScheme.clone().optional(),
    quality: vine.number().optional(),
    width: vine.number().optional(),
    height: vine.number().optional()
  }),
  DIR_CREATE: vine.create({
    name: VineStringScheme.clone().maxLength(64),
    parentId: VineUUIDV4Scheme.clone(),
    path: VineStringScheme.clone()
  }),
  DIR_READ: vine.create({
    id: VineUUIDV4Scheme.clone().optional()
  }),
  DIR_READ_OBJECT: vine.create({
    id: VineUUIDV4Scheme.clone()
  }),
  DIR_REMOVE: vine.create(vine.record(VineStorageObjectScheme.clone())),
  DIR_COPY: vine.create({
    parentId: VineUUIDV4Scheme.clone(),
    items: vine.record(VineStorageObjectScheme.clone())
  }),
  DIR_MOVE: vine.create({
    parentId: VineUUIDV4Scheme.clone(),
    items: vine.record(VineStorageObjectScheme.clone())
  }),
  // User route schemes
  LOG_IN: vine.create({
    email: VineEmailScheme.clone(), 
    password: VinePasswordScheme.clone()
  }),
  LOG_UP: vine.create({
    email: VineEmailScheme.clone(),
    password: VinePasswordScheme.clone().sameAs("confirmPassword").confirmed({ as: "confirmPassword" }),
    confirmPassword: VinePasswordScheme.clone().sameAs("password") 
  }),
  REQUEST_RESET_PASSWORD: vine.create({
    email: VineEmailScheme.clone()
  }),
  RESET_PASSWORD: vine.create({
    password: VinePasswordScheme.clone(),
    token: VineJwtScheme.clone()
  }),
  REQUEST_CONFIRM_EMAIL: vine.create({
    [COOKIE.ACCESS_TOKEN_KEY]: VineJwtScheme.clone()
  }),
  CONFIRM_EMAIL: vine.create({
    token: VineJwtScheme.clone()
  }),
  // Middleware route schemes
  JWT_PAYLOAD: vine.create({
    id: VineUUIDV4Scheme.clone()
  }),
  REFRESH_TOKEN: vine.create({
    [COOKIE.ACCESS_TOKEN_KEY]: VineJwtScheme.clone()
  }),
  AUTH: vine.create({
    [COOKIE.REFRESH_TOKEN_KEY]: VineJwtScheme.clone().optional(),
    [COOKIE.ACCESS_TOKEN_KEY]: VineJwtScheme.clone().optional()
  }),
};

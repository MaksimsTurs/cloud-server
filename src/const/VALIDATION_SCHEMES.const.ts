import type { VineObject, VineString, VineValidator } from "@vinejs/vine";

import vine from "@vinejs/vine";

import COOKIE from "./COOKIE.const";

vine.convertEmptyStringsToNull = true;

// Common Schemes:
const Pseudonym: VineString = vine.string().escape().maxLength(32).minLength(1);
const Email: VineString = vine.string().email();
const UUIDv4: VineString = vine.string().uuid({ version: [4] });
const JWT: VineString = vine.string().jwt();
const Password: VineString = vine.string().minLength(12);
const JWTPayload: VineObject<any, any, any, any> = vine.object({
  id: UUIDv4.clone(),
}).allowUnknownProperties();
const StorageObjectName: VineString = vine.string().escape().maxLength(64);
const StorageObject: VineObject<any, any, unknown, unknown> = vine.object({
  id:         UUIDv4.clone(),
  user_id:    UUIDv4.clone(),
  parent_id:  UUIDv4.clone().optional(),
  mime_type:  vine.string().optional(),
  name:       vine.string(),
  type:       vine.number()
});

export default {
  validate: async function(validator: VineValidator<any, any>, data: any): Promise<void> {
    await validator.validate(data);
  },
  STORAGE: {
    GET_OBJECT_BY_ID:       vine.create(vine.object({ id: UUIDv4.clone() })),
    COPY:                   vine.create(vine.object({ parentId: UUIDv4.clone(), items: vine.record(StorageObject.clone()) })),
    MOVE:                   vine.create(vine.object({ parentId: UUIDv4.clone(), items: vine.record(StorageObject.clone()) })),
    REMOVE:                 vine.create(vine.record(StorageObject.clone())),
    CREATE:                 vine.create(vine.object({ name: StorageObjectName.clone(), path: vine.string(), parentId: UUIDv4.clone() })),
    KNOWN_UPLOAD_PARAMS:    vine.create(vine.object({ parentId: UUIDv4.clone() }).allowUnknownProperties()),
    UNKNOWN_UPLOAD_PARAMS:  vine.create(
      vine.record(vine.unionOfTypes([
        vine.string(),
        vine.object({
          name:       StorageObjectName.clone().optional(),
          convertTo:  vine.enum(["png", "webp", "jpg", "jpeg"]).optional(),
          quality:    vine.number().range([0, 100]).optional(),
          width:      vine.number().optional(),
          height:     vine.number().optional()
        })
      ]))
    )
  },
  USER: {
    LOG_UP:                 vine.create(
      vine.object({
        pseudonym:        Pseudonym.clone(),
        email:            Email.clone(),
        password:         Password.clone().sameAs("confirmPassword").confirmed({ as: "confirmPassword" }),
        confirmPassword:  Password.clone().sameAs("password"),
        privacyPolicy:    vine.literal(true)
      })
    ),
    LOG_IN:                 vine.create(vine.object({ pseudonym: Pseudonym.clone(), password: Password.clone() })),
    REQUEST_RESET_PASSWORD: vine.create(vine.object({ pseudonym: Pseudonym.clone(), email: Email.clone() })),
    REQUEST_CONFIRM_EMAIL:  vine.create(vine.object({ email: Email.clone() })),
    CONFIRM_EMAIL:          vine.create(vine.object({ token: JWT.clone() })),
    RESET_PASSWORD:         vine.create(vine.object({ password: Password.clone(), token: JWT.clone() })),
    REFRESH_TOKEN:          vine.create(vine.object({ [COOKIE.REFRESH_TOKEN_KEY]: JWT.clone() }))
  },
  COMMON: {
    IS_AUTH:              vine.create(vine.object({ [COOKIE.ACCESS_TOKEN_KEY]: JWT.clone() })),
    UUID:                 vine.create(UUIDv4.clone()),
    USER_PSEUDONYM:       vine.create(Pseudonym.clone()),
    USER_EMAIL:           vine.create(Email.clone()),
    USER_PASSWORD:        vine.create(Password.clone()),
    JWT:                  vine.create(JWT.clone()),
    JWT_PAYLOAD:          vine.create(JWTPayload.clone()),
    STORAGE_OBJECT_NAME:  vine.create(StorageObject.clone()),
    STORAGE_OBJECT:       vine.create(StorageObject.clone())
  },
} as const;

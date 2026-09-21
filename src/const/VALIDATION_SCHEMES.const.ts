import type { VineObject, VineRecord, VineString } from "@vinejs/vine";

import vine from "@vinejs/vine";

import COOKIE from "./COOKIE.const";

vine.convertEmptyStringsToNull = true;

// Common Schemes:
const UUID_SHEME: VineString = vine.string().uuid({ version: [4] });
const JWT_SCHEME: VineString = vine.string().jwt();
const PASSWORD_SCHEME: VineString = vine.string().minLength(12);
const EMAIL_SCHEME: VineString = vine.string().email();
const JWT_USER_PAYLOAD_SCHEME: VineObject<any, any, any, any> = vine.object({
  id: UUID_SHEME.clone(),
}).allowUnknownProperties();
// Storage object routes/services schemes:
const STORAGE_OBJECT_SCHEME: VineObject<any, any, unknown, unknown> = vine.object({
  id:         UUID_SHEME.clone(),
  user_id:    UUID_SHEME.clone(),
  parent_id:  UUID_SHEME.clone().optional(),
  mime_type:  vine.string().optional(),
  name:       vine.string(),
  type:       vine.number()
});
const STORAGE_OBJECT_PROCESS_OPTIONS_SCHEME: VineObject<any, any, any, any> = vine.object({
  name:       vine.string().maxLength(64).optional(),
  convertTo:  vine.string().optional(),
  quality:    vine.number().optional(),
  width:      vine.number().optional(),
  height:     vine.number().optional()
});
const FILES_UPLOAD_KNOWN_PARAMS_SCHEME: VineObject<any, any, any, any> = vine.object({
  parentId: UUID_SHEME.clone()
}).allowUnknownProperties();
const FILES_UPLOAD_UNKNOWN_PARAMS_SCHEME: VineRecord<any> = vine.record(
  vine.unionOfTypes([vine.string(), STORAGE_OBJECT_PROCESS_OPTIONS_SCHEME.clone()])
);
const FOLDER_CREATE_SCHEME: VineObject<any, any, any, any> = vine.object({
  name: vine.string().maxLength(64),
  path: vine.string(),
  parentId: UUID_SHEME.clone()
});
const FOLDER_REMOVE_SCHEME: VineRecord<VineObject<any, any, any, any>> = vine.record(STORAGE_OBJECT_SCHEME.clone());
const FOLDER_GET_SCHEME: VineObject<any, any, any, any> = vine.object({
  id: UUID_SHEME.clone().optional()
});
const FOLDER_MOVE_SCHEME: VineObject<any, any, any, any> = vine.object({
  parentId: UUID_SHEME.clone(),
  items: vine.record(STORAGE_OBJECT_SCHEME.clone())
}); 
const FOLDER_COPY_SCHEME: VineObject<any, any, any, any> = vine.object({
  parentId: UUID_SHEME.clone(),
  items: vine.record(STORAGE_OBJECT_SCHEME.clone())
});
const FOLDER_GET_OBJECT_SCHEME: VineObject<any, any, any, any> = vine.object({
  id: UUID_SHEME.clone()
});
// User routes/services schemas:
const USER_LOG_IN_SCHEME: VineObject<any, any, any, any> = vine.object({
  email: EMAIL_SCHEME.clone(), 
  password: PASSWORD_SCHEME.clone()
});
const USER_LOG_UP_SCHEME: VineObject<any, any, any, any> = vine.object({
  email:            EMAIL_SCHEME.clone(),
  password:         PASSWORD_SCHEME.clone().sameAs("confirmPassword").confirmed({ as: "confirmPassword" }),
  confirmPassword:  PASSWORD_SCHEME.clone().sameAs("password") 
});
const USER_REQUEST_RESET_PASSWORD_SCHEME: VineObject<any, any, any, any> = vine.object({
  email: EMAIL_SCHEME.clone()
});
const USER_RESET_PASSWORD_SCHEME: VineObject<any, any, any, any> = vine.object({
  password: PASSWORD_SCHEME.clone(),
  token:    JWT_SCHEME.clone()
});
const USER_REQUEST_CONFIRM_EMAIL_SCHEME: VineObject<any, any, any, any> = vine.object({
  [COOKIE.ACCESS_TOKEN_KEY]: JWT_SCHEME.clone()
});
const USER_CONFIRM_EMAIL_SCHEME: VineObject<any, any, any, any> = vine.object({
  token: JWT_SCHEME.clone()
});
const USER_REFRESH_TOKEN_SCHEME: VineObject<any, any, any, any> = vine.object({
  [COOKIE.REFRESH_TOKEN_KEY]: JWT_SCHEME.clone()
});
// Middleware schemas:
const IS_AUTHORIZED_SCHEMA: VineObject<any, any, any, any> = vine.object({
    [COOKIE.ACCESS_TOKEN_KEY]: JWT_SCHEME.clone().optional()
});

export default {
  validate: async function(scheme: any, data: any): Promise<void> {
    await (vine.create(scheme).validate(data));
  },
  // Common schemes
  UUID_SHEME,
  JWT_SCHEME,
  JWT_USER_PAYLOAD_SCHEME,
  PASSWORD_SCHEME,
  EMAIL_SCHEME,
  STORAGE_OBJECT_SCHEME,
  STORAGE_OBJECT_PROCESS_OPTIONS_SCHEME,
  // Storage Object routes/services schemes
  FILES_UPLOAD_KNOWN_PARAMS_SCHEME,
  FILES_UPLOAD_UNKNOWN_PARAMS_SCHEME,
  FOLDER_CREATE_SCHEME,
  FOLDER_GET_SCHEME,
  FOLDER_REMOVE_SCHEME,
  FOLDER_COPY_SCHEME,
  FOLDER_MOVE_SCHEME,
  FOLDER_GET_OBJECT_SCHEME,
  // User route schemes
  USER_LOG_UP_SCHEME,
  USER_LOG_IN_SCHEME,
  USER_RESET_PASSWORD_SCHEME,
  USER_CONFIRM_EMAIL_SCHEME,
  USER_REQUEST_CONFIRM_EMAIL_SCHEME,
  USER_REQUEST_RESET_PASSWORD_SCHEME,
  USER_REFRESH_TOKEN_SCHEME,
  // Middleware route schemes
  IS_AUTHORIZED_SCHEMA
};

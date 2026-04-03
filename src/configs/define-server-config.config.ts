import { isNull, isUndefined } from "@maksims/is.js";

export default function defineServerConfig() {
  if(isUndefined(process.env.MODE) || 
     isNull(process.env.MODE) || 
     !process.env.MODE.length) {
    throw new TypeError("process.env.MODE must be defined!");
  }

  if(isUndefined(process.env.BASE_USERS_PATH) ||
     isNull(process.env.BASE_USERS_PATH) || 
     !process.env.BASE_USERS_PATH.length) {
    throw new TypeError("process.env.BASE_USERS_PATH must be defined!");
  }

  if(isUndefined(process.env.BASE_UPLOAD_TMP_PATH) ||
     isNull(process.env.BASE_UPLOAD_TMP_PATH) ||
     !process.env.BASE_UPLOAD_TMP_PATH.length) {
    throw new TypeError("process.env.BASE_UPLOAD_TMP_PATH must be defined!");
  }

  if(isUndefined(process.env.ACCESS_TOKEN_SECRET) ||
     isNull(process.env.ACCESS_TOKEN_SECRET) ||
     !process.env.ACCESS_TOKEN_SECRET.length) {
    throw new TypeError("process.env.ACCESS_TOKEN_SECRET must be defined!");
  }

  if(isUndefined(process.env.REFRESH_TOKEN_SECRET) ||
     isNull(process.env.REFRESH_TOKEN_SECRET) ||
     !process.env.REFRESH_TOKEN_SECRET.length) {
    throw new TypeError("process.env.REFRESH_TOKEN_SECRET must be defined!");
  }

  if(isUndefined(process.env.EMAIL_CONFIRM_SECRET) || 
     isNull(process.env.EMAIL_CONFIRM_SECRET) ||
     !process.env.EMAIL_CONFIRM_SECRET.length) {
    throw new TypeError("process.env.EMAIL_CONFORMATION_SECRET must be defined!");
  }

  if(isUndefined(process.env.RESET_PASSWORD_SECRET) || 
     isNull(process.env.RESET_PASSWORD_SECRET) ||
     !process.env.RESET_PASSWORD_SECRET.length) {
    throw new TypeError("process.env.EMAIL_CONFORMATION_SECRET must be defined!");
  }

  if(isUndefined(process.env.PORT) ||
     isNull(process.env.PORT) ||
     !process.env.PORT.length) {
    throw new TypeError("process.env.PORT must be defined!");
  }

  if(isUndefined(process.env.HOST) ||
     isNull(process.env.HOST) ||
     !process.env.HOST.length) {
    throw new TypeError("process.env.PORT must be defined!");
  }

  if(isUndefined(process.env.ALLOWED_ORIGINS) || 
     isNull(process.env.ALLOWED_ORIGINS) ||
     !process.env.ALLOWED_ORIGINS.length) {
    throw new TypeError("process.env.ALLOWED_ORIGINS must be defined!");
  }

  if(isUndefined(process.env.POSTGRES_HOST) || 
     isNull(process.env.POSTGRES_HOST) ||
     !process.env.POSTGRES_HOST.length) {
    throw new TypeError("process.env.POSTGRES_HOST must be defined!");
  }

  if(isUndefined(process.env.POSTGRES_PORT) || 
     isNull(process.env.POSTGRES_PORT) ||
     !process.env.POSTGRES_PORT.length) {
    throw new TypeError("process.POSTGRES_PORT must be defined!");
  }

  if(isUndefined(process.env.POSTGRES_USER) || 
     isNull(process.env.POSTGRES_USER) ||
     !process.env.POSTGRES_USER.length) {
    throw new TypeError("process.env.POSTGRES_USER must be defined!");
  }

  if(isUndefined(process.env.POSTGRES_PASSWORD) || 
     isNull(process.env.POSTGRES_PASSWORD) ||
     !process.env.POSTGRES_PASSWORD.length) {
    throw new TypeError("process.env.POSTGRES_PASSWORD must be defined!");
  }

  if(isUndefined(process.env.POSTGRES_DATABASE) || 
     isNull(process.env.POSTGRES_DATABASE) ||
     !process.env.POSTGRES_DATABASE.length) {
    throw new TypeError("process.env.POSTGRES_DATABASE must be defined!");
  }

  if(isUndefined(process.env.POSTGRES_CA_CERTIFICATE) || 
     isNull(process.env.POSTGRES_CA_CERTIFICATE) ||
     !process.env.POSTGRES_CA_CERTIFICATE.length) {
    throw new TypeError("process.env.POSTGRES_CA_CERTIFICATE must be defined!");
  }

  if(isUndefined(process.env.NODEMAILER_HOST) || 
     isNull(process.env.NODEMAILER_HOST) ||
     !process.env.NODEMAILER_HOST.length) {
    throw new TypeError("process.env.NODEMAILER_HOST must be defined!");
  }

  if(isUndefined(process.env.NODEMAILER_PORT) || 
     isNull(process.env.NODEMAILER_PORT) ||
     !process.env.NODEMAILER_PORT.length) {
    throw new TypeError("process.env.NODEMAILER_PORT must be defined!");
  }

  if(isUndefined(process.env.NODEMAILER_USER) || 
     isNull(process.env.NODEMAILER_USER) ||
     !process.env.NODEMAILER_USER.length) {
    throw new TypeError("process.env.NODEMAILER_USER must be defined!");
  }

  if(isUndefined(process.env.NODEMAILER_PASSWORD) || 
     isNull(process.env.NODEMAILER_PASSWORD) ||
     !process.env.NODEMAILER_PASSWORD.length) {
    throw new TypeError("process.env.NODEMAILER_PASSWORD must be defined!");
  }

  return {
    BASE_USERS_PATH: process.env.BASE_USERS_PATH,
    BASE_UPLOAD_TMP_PATH: process.env.BASE_UPLOAD_TMP_PATH,

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    EMAIL_CONFIRM_SECRET: process.env.EMAIL_CONFIRM_SECRET,
    RESET_PASSWORD_SECRET: process.env.RESET_PASSWORD_SECRET,

    NODEMAILER_HOST: process.env.NODEMAILER_HOST,
    NODEMAILER_PORT: parseInt(process.env.NODEMAILER_PORT),
    NODEMAILER_USER: process.env.NODEMAILER_USER,
    NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
    
    MODE: process.env.MODE,
    HOST: process.env.HOST,
    PORT: parseInt(process.env.PORT),

    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,

    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT),
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    POSTGRES_CA_CERTIFICATE: process.env.POSTGRES_CA_CERTIFICATE
  };
};

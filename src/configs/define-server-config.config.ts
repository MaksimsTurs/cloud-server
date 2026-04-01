import { isUndefined, isNull, isStrEmpty } from "../utils/is.util";

export default function defineServerConfig() {
  if(isUndefined(process.env.MODE) || 
     isNull(process.env.MODE) || 
     isStrEmpty(process.env.MODE)) {
    throw new TypeError("process.env.MODE must be defined!");
  }

  if(isUndefined(process.env.BASE_USERS_PATH) ||
     isNull(process.env.BASE_USERS_PATH) || 
     isStrEmpty(process.env.BASE_USERS_PATH)) {
    throw new TypeError("process.env.BASE_USERS_PATH must be defined!");
  }

  if(isUndefined(process.env.BASE_UPLOAD_TMP_PATH) ||
     isNull(process.env.BASE_UPLOAD_TMP_PATH) ||
     isStrEmpty(process.env.BASE_UPLOAD_TMP_PATH)) {
    throw new TypeError("process.env.BASE_UPLOAD_TMP_PATH must be defined!");
  }

  if(isUndefined(process.env.ACCESS_TOKEN_SECRET) ||
     isNull(process.env.ACCESS_TOKEN_SECRET) ||
     isStrEmpty(process.env.ACCESS_TOKEN_SECRET)) {
    throw new TypeError("process.env.ACCESS_TOKEN_SECRET must be defined!");
  }

  if(isUndefined(process.env.REFRESH_TOKEN_SECRET) ||
     isNull(process.env.REFRESH_TOKEN_SECRET) ||
     isStrEmpty(process.env.REFRESH_TOKEN_SECRET)) {
    throw new TypeError("process.env.REFRESH_TOKEN_SECRET must be defined!");
  }

  if(isUndefined(process.env.EMAIL_CONFIRM_SECRET) || 
     isNull(process.env.EMAIL_CONFIRM_SECRET) ||
     isStrEmpty(process.env.EMAIL_CONFIRM_SECRET)) {
    throw new TypeError("process.env.EMAIL_CONFORMATION_SECRET must be defined!");
  }

  if(isUndefined(process.env.RESET_PASSWORD_SECRET) || 
     isNull(process.env.RESET_PASSWORD_SECRET) ||
     isStrEmpty(process.env.RESET_PASSWORD_SECRET)) {
    throw new TypeError("process.env.EMAIL_CONFORMATION_SECRET must be defined!");
  }

  if(isUndefined(process.env.PORT) ||
     isNull(process.env.PORT) ||
     isStrEmpty(process.env.PORT)) {
    throw new TypeError("process.env.PORT must be defined!");
  }

  if(isUndefined(process.env.HOST) ||
     isNull(process.env.HOST) ||
     isStrEmpty(process.env.HOST)) {
    throw new TypeError("process.env.PORT must be defined!");
  }

  if(isUndefined(process.env.ALLOWED_ORIGINS) || 
     isNull(process.env.ALLOWED_ORIGINS) ||
     isStrEmpty(process.env.ALLOWED_ORIGINS)) {
    throw new TypeError("process.env.ALLOWED_ORIGINS must be defined!");
  }

  if(isUndefined(process.env.POSTGRES_HOST) || 
     isNull(process.env.POSTGRES_HOST) ||
     isStrEmpty(process.env.POSTGRES_HOST)) {
    throw new TypeError("process.env.POSTGRES_HOST must be defined!");
  }

  if(isUndefined(process.env.POSTGRES_PORT) || 
     isNull(process.env.POSTGRES_PORT) ||
     isStrEmpty(process.env.POSTGRES_PORT)) {
    throw new TypeError("process.POSTGRES_PORT must be defined!");
  }

  if(isUndefined(process.env.POSTGRES_USER) || 
     isNull(process.env.POSTGRES_USER) ||
     isStrEmpty(process.env.POSTGRES_USER)) {
    throw new TypeError("process.env.POSTGRES_USER must be defined!");
  }

  if(isUndefined(process.env.POSTGRES_PASSWORD) || 
     isNull(process.env.POSTGRES_PASSWORD) ||
     isStrEmpty(process.env.POSTGRES_PASSWORD)) {
    throw new TypeError("process.env.POSTGRES_PASSWORD must be defined!");
  }

  if(isUndefined(process.env.POSTGRES_DATABASE) || 
     isNull(process.env.POSTGRES_DATABASE) ||
     isStrEmpty(process.env.POSTGRES_DATABASE)) {
    throw new TypeError("process.env.POSTGRES_DATABASE must be defined!");
  }

  if(isUndefined(process.env.POSTGRES_CA_CERTIFICATE) || 
     isNull(process.env.POSTGRES_CA_CERTIFICATE) ||
     isStrEmpty(process.env.POSTGRES_CA_CERTIFICATE)) {
    throw new TypeError("process.env.POSTGRES_CA_CERTIFICATE must be defined!");
  }

  if((isUndefined(process.env.NODEMAILER_HOST) || 
     isNull(process.env.NODEMAILER_HOST) ||
     isStrEmpty(process.env.NODEMAILER_HOST))) {
    throw new TypeError("process.env.NODEMAILER_HOST must be defined!");
  }

  if((isUndefined(process.env.NODEMAILER_PORT) || 
     isNull(process.env.NODEMAILER_PORT) ||
     isStrEmpty(process.env.NODEMAILER_PORT))) {
    throw new TypeError("process.env.NODEMAILER_PORT must be defined!");
  }

  if((isUndefined(process.env.NODEMAILER_USER) || 
     isNull(process.env.NODEMAILER_USER) ||
     isStrEmpty(process.env.NODEMAILER_USER))) {
    throw new TypeError("process.env.NODEMAILER_USER must be defined!");
  }

  if((isUndefined(process.env.NODEMAILER_PASSWORD) || 
     isNull(process.env.NODEMAILER_PASSWORD) ||
     isStrEmpty(process.env.NODEMAILER_PASSWORD))) {
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

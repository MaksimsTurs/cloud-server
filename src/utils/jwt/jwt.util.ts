import type { JwtTokenPaylaod } from "./jwt.type";
import type { SignOptions } from "jsonwebtoken";

import app from "../../Application";

import jsonwebtoken from "jsonwebtoken";

import COOKIE from "../../const/COOKIE.const";

function generateToken(payload: string, secret: string, options?: SignOptions): string {
  return jsonwebtoken.sign(payload, secret, options);
};

function verifyToken<P = unknown>(token: string = "", secret: string): JwtTokenPaylaod<P> | undefined {
  if(!token) {
    return undefined;
  }

  try {
    return jsonwebtoken.verify(token, secret) as JwtTokenPaylaod<P>; 
  } catch(_) {
    return undefined;
  }
};

export function generateAccessToken(payload: any): string {
  const { conf } = app.context;
  return generateToken(payload, conf.ACCESS_TOKEN_SECRET, { expiresIn: COOKIE.ACCESS_OPTIONS.maxAge });
};

export function generateRefreshToken(payload: any): string {
  const { conf } = app.context;
  return generateToken(payload, conf.REFRESH_TOKEN_SECRET, { expiresIn: COOKIE.REFRESH_OPTIONS.maxAge });
};

export function generateConfirmEmailToken(payload: any): string {
  const { conf } = app.context;
  return generateToken(payload, conf.EMAIL_CONFIRM_SECRET, { expiresIn: "5 minutes" });
};

export function generateResetPasswordToken(payload: any): string {
  const { conf } = app.context;
  return generateToken(payload, conf.RESET_PASSWORD_SECRET, { expiresIn: "5 minutes" });
};

export function verifyAccessToken<P = unknown>(token?: string): JwtTokenPaylaod<P> | undefined {
  const { conf } = app.context;
  return verifyToken(token, conf.ACCESS_TOKEN_SECRET!);
};

export function verifyRefreshToken<P = unknown>(token?: string): JwtTokenPaylaod<P> | undefined {
  const { conf } = app.context;
  return verifyToken(token, conf.REFRESH_TOKEN_SECRET!);
};

export function verifyEmailConfirmToken<P>(token?: string): JwtTokenPaylaod<P> | undefined {
  const { conf } = app.context;
  return verifyToken(token, conf.EMAIL_CONFIRM_SECRET);
};

export function verifyResetPasswordToken<P>(token?: string): JwtTokenPaylaod<P> | undefined {
  const { conf } = app.context;
  return verifyToken(token, conf.RESET_PASSWORD_SECRET);
};

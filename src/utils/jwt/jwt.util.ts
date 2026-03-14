import type { JwtTokenPaylaod } from "./jwt.type";

import type { SignOptions } from "jsonwebtoken";

import { serverConfigs } from "../../index";

import jsonwebtoken from "jsonwebtoken";

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
  return generateToken(payload, serverConfigs.ACCESS_TOKEN_SECRET, { expiresIn: "7 days" });
};

export function generateRefreshToken(payload: any): string {
  return generateToken(payload, serverConfigs.REFRESH_TOKEN_SECRET, { expiresIn: "15 minutes" });
};

export function generateEmailConfirmationToken(payload: any): string {
  return generateToken(payload, serverConfigs.EMAIL_CONFORMATION_SECRET, { expiresIn: "5 minutes" });
};

export function generateResetPasswordToken(payload: any): string {
  return generateToken(payload, serverConfigs.RESET_PASSWORD_SECRET, { expiresIn: "5 minutes" });
};

export function verifyAccessToken<P = unknown>(token?: string): JwtTokenPaylaod<P> | undefined {
  return verifyToken(token, serverConfigs.ACCESS_TOKEN_SECRET!);
};

export function verifyRefreshToken<P = unknown>(token?: string): JwtTokenPaylaod<P> | undefined {
  return verifyToken(token, serverConfigs.REFRESH_TOKEN_SECRET!);
};

export function verifyEmailConfirmToken<P>(token?: string): JwtTokenPaylaod<P> | undefined {
  return verifyToken(token, serverConfigs.EMAIL_CONFORMATION_SECRET);
};

export function verifyResetPasswordToken<P>(token?: string): JwtTokenPaylaod<P> | undefined {
  return verifyToken(token, serverConfigs.RESET_PASSWORD_SECRET);
};

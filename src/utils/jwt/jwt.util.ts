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

  return jsonwebtoken.verify(token, secret) as JwtTokenPaylaod<P>; 
};

export function generateAccessToken(payload: any): string {
  return generateToken(payload, serverConfigs.ACCESS_TOKEN_SECRET, { expiresIn: "7 days" });
};

export function generateRefreshToken(payload: any): string {
  return generateToken(payload, serverConfigs.REFRESH_TOKEN_SECRET, { expiresIn: "15 minutes" });
};

export function generateEmailConformationToken(payload: any): string {
  return generateToken(payload, serverConfigs.EMAIL_CONFORMATION_SECRET);
};

export function verifyAccessToken<P = unknown>(token?: string): JwtTokenPaylaod<P> | undefined {
  return verifyToken(token, process.env.ACCESS_TOKEN_SECRET!);
};

export function verifyRefreshToken<P = unknown>(token?: string): JwtTokenPaylaod<P> | undefined {
  return verifyToken(token, process.env.REFRESH_TOKEN_SECRET!);
};

export function verifyEmailConformationToken<P>(token?: string): JwtTokenPaylaod<P> | undefined {
  return verifyToken(token, serverConfigs.EMAIL_CONFORMATION_SECRET);
};

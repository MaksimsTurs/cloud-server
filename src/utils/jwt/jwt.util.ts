import type { JwtTokenPaylaod } from "./jwt.type";

import type { SignOptions } from "jsonwebtoken";

import jsonwebtoken from "jsonwebtoken";

function generateToken(payload: string, secret: string, options: SignOptions): string {
  return jsonwebtoken.sign(payload, secret, options);
};

function verifyToken<P = unknown>(token: string = "", secret: string): JwtTokenPaylaod<P> | undefined {
   if(!token) {
    return undefined;
  }

  return jsonwebtoken.verify(token, secret) as JwtTokenPaylaod<P>; 
};

export function generateAccessToken(payload: any): string {
  const secret: string = process.env.ACCESS_TOKEN_SECRET as string;
  return generateToken(payload, secret, { expiresIn: "7 days" });
};

export function generateRefreshToken(payload: any): string {
  const secret: string = process.env.REFRESH_TOKEN_SECRET as string;
  return generateToken(payload, secret, { expiresIn: "15 minutes" });
};

export function verifyAccessToken<P = unknown>(token?: string): JwtTokenPaylaod<P> | undefined {
  return verifyToken(token, process.env.ACCESS_TOKEN_SECRET!);
};

export function verifyRefreshToken<P = unknown>(token?: string): JwtTokenPaylaod<P> | undefined {
  return verifyToken(token, process.env.REFRESH_TOKEN_SECRET!);
};

export function isBlackListed(_token: string): boolean {
  // TODO: Implement...
  return false;
};

export function addTokenToBlackList(_token: string): void {
  // TODO: Implement...
};

export function removeTokenFromBlackList(_token: string): void {
  // TODO: Implement...
};

import type { JwtTokenPaylaod } from "./jwt.type";

import jsonwebtoken from "jsonwebtoken";

function generateToken(payload: string, secret: string): string {
  return jsonwebtoken.sign(payload, secret, { expiresIn: "7 days" });
};

function verifyToken<P = unknown>(token: string = "", secret: string): JwtTokenPaylaod<P> | undefined {
   if(!token) {
    return undefined;
  }

  return jsonwebtoken.verify(token, secret) as JwtTokenPaylaod<P>; 
};

export function generateAccessToken(payload: any): string {
  return generateToken(payload, process.env.ACCESS_TOKEN_SECRET as string);
};

export function generateRefreshToken(payload: any): string {
  return generateToken(payload, process.env.REFRESH_TOKEN_SECRET as string);
};

export function verifyAccessToken<P = unknown>(token?: string): JwtTokenPaylaod<P> | undefined {
  return verifyToken(token, process.env.ACCESS_TOKEN_SECRET!);
};

export function verifyRefreshToken<P = unknown>(token?: string): JwtTokenPaylaod<P> | undefined {
  return verifyToken(token, process.env.REFRESH_TOKEN_SECRET!);
};

export function isBlackListed(token: string): boolean {
  // TODO: Implement...
  return false;
};

export function addTokenToBlackList(token: string): void {
  // TODO: Implement...
};

export function removeTokenFromBlackList(token: string): void {
  // TODO: Implement...
};

import type { JwtPayload } from "jsonwebtoken";

export type JwtTokenPaylaod<P = unknown> = P & JwtPayload;

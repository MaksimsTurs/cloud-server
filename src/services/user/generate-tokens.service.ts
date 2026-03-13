import type { UserTokens } from "../../index.type";

import { generateAccessToken, generateRefreshToken } from "../../utils/jwt/jwt.util";

export default function generateTokens(id: string): UserTokens {
  return {
    access: generateAccessToken({ id }),
    refresh: generateRefreshToken({ id })
  };
};

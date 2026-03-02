import type { User } from "../../index.type";

import { generateRefreshToken } from "../../utils/jwt/jwt.util";

export default function refreshToken(user: User): string {
  return generateRefreshToken({ id: user.id });
};

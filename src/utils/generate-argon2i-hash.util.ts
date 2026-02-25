import crypto from "node:crypto";

export default function generateArgon2iHash(payload: string): string {
  return crypto.argon2Sync("argon2i", {
    memory: 65553,
    message: payload,
    tagLength: 64,
    nonce: crypto.randomBytes(16),
    parallelism: 4,
    passes: 3,
  }).toString("base64");
};

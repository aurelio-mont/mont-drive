import { config } from "dotenv";

config({ path: ".env" });

export const SERVER_PORT: number =
  parseInt(process.env.SERVER_PORT!, 10) || 3001;

export const TURSO_CONNECTION_URL =
  process.env.TURSO_CONNECTION_URL || "https://turso.mont.dev";

export const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN || "token";

export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";

import { TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN } from './src/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: TURSO_CONNECTION_URL,
    authToken: TURSO_AUTH_TOKEN,
  },
});
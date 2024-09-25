import { ENV } from './src/config/env';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: ENV.TURSO_CONNECTION_URL,
    authToken: ENV.TURSO_AUTH_TOKEN,
  },
});
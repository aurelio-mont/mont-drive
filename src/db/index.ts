import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import * as schema from './schema';

import { TURSO_CONNECTION_URL } from '../config';


const client = createClient({
  url: TURSO_CONNECTION_URL,
  //authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client, { schema });
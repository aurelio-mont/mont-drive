import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import * as schema from './schema';
import { ENV } from '../config/env';



const client = createClient({
  url: ENV.TURSO_CONNECTION_URL!,
  //authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client, { schema });
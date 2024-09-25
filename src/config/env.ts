import * as env from 'env-var';
import "dotenv/config";

export const ENV = {
    SERVER_PORT: env.get('SERVER_PORT').required().asPortNumber(),
    TURSO_CONNECTION_URL: env.get('TURSO_CONNECTION_URL').required().asString(),
    TURSO_AUTH_TOKEN: env.get('TURSO_AUTH_TOKEN').required().asString(),
    TOKEN_SECRET: env.get('TOKEN_SECRET').required().asString(),
}
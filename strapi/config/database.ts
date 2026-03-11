import path from 'path';

export default ({ env }: { env: any }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');
  const sqliteFilename = env('DATABASE_FILENAME', '.tmp/data.db');
  const connections: Record<string, unknown> = {
    sqlite: {
      connection: {
        filename: path.isAbsolute(sqliteFilename)
          ? sqliteFilename
          : path.join(process.cwd(), sqliteFilename),
      },
      useNullAsDefault: true,
    },
    postgres: {
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && { rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false) },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
  };

  return {
    connection: {
      client,
      ...(connections[client] as object),
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};

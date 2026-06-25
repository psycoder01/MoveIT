export default () => {
  const requiredEnvVars = [
    "PORT",
    "DB_HOST",
    "DB_PORT",
    "DB_USERNAME",
    "DB_PASSWORD",
    "DB_PASSWORD",
    "DB_SYNCHRONIZE",
    "KC_URI",
    "KC_REALM",
    "KC_CLIENT_ID",
    "KC_CLIENT_SECRET",
    "KC_ISSUER",
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName],
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`,
    );
  }

  return {
    port: parseInt(process.env.PORT ?? "5000"),
    db: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.DB_SYNCHRONIZE,
    },
    keycloak: {
      uri: process.env.KC_URI,
      realm: process.env.KC_REALM,
      clientId: process.env.KC_CLIENT_ID,
      clientSecret: process.env.KC_CLIENT_SECRET,
      issuer: process.env.KC_ISSUER,
    },
  };
};

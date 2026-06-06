export default () => {
  const requiredEnvVars = [
    "PORT",
    "DB_URI",
    "KC_URI",
    "KC_REALM",
    "KC_GRANT_TYPE",
    "KC_CLIENT_ID",
    "KC_CLIENT_SECRET",
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
    db: process.env.DB_URI,
    keycloak: {
      uri: process.env.KC_URI,
      realm: process.env.KC_REALM,
      grantType: process.env.KC_GRANT_TYPE,
      clientId: process.env.KC_CLIENT_ID,
      clientSecret: process.env.KC_CLIENT_SECRET,
    },
  };
};

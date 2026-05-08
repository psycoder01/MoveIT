export default () => ({
  port: parseInt(process.env.PORT ?? "5000"),
  db: process.env.DB_URI,
  keycloak: {
    uri: process.env.KC_URI,
    realm: process.env.KC_REALM,
    grantType: process.env.KC_GRANT_TYPE,
    clientId: process.env.KC_CLIENT_ID,
    clientSecret: process.env.KC_CLIENT_SECRET,
    masterUsername: process.env.KC_MASTER_USERNAME,
    masterPassword: process.env.KC_MASTER_PASSWORD,
  },
});

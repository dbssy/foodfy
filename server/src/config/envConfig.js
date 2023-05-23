const envConfig = {
  host: process.env.HOST,
  port: process.env.PORT,
  origin: process.env.ORIGIN,
  secretKey: process.env.SECRET_KEY,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
  databaseSettings: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};

module.exports = envConfig;

const { Client } = require('pg');

const EnvConfig = require('../config/envConfig');

const client = new Client({
  host: EnvConfig.databaseSettings.host,
  port: EnvConfig.databaseSettings.port,
  user: EnvConfig.databaseSettings.user,
  password: EnvConfig.databaseSettings.password,
  database: EnvConfig.databaseSettings.database,
});

client.connect();

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};

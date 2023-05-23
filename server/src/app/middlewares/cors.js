const cors = require('cors');

const EnvConfig = require('../../config/envConfig');

module.exports = cors({
  origin: EnvConfig.origin,
  methods: '*',
  allowedHeaders: '*',
});

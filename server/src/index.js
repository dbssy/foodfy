const express = require('express');
const path = require('path');
require('express-async-errors');
require('dotenv').config();

const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');

const EnvConfig = require('./config/envConfig');

const app = express();

app.use(cors);
app.use(express.json());
app.use('/images', express.static(path.resolve(__dirname, '../tmp/images')));
app.use(errorHandler);

app.listen(EnvConfig.port, () => console.log(`🔥 Server started at ${EnvConfig.host}:${EnvConfig.port}`));

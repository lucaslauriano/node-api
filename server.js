const express = require('express');
const cors = require('cors');
const requireDir = require('require-dir');
require('custom-env').env();

//Iniciando o App
const app = express();
app.use(express.json());
app.use(cors());

requireDir('./src/models');

// Routes
app.use('/api', require('./src/routes'));

app.listen(8080);

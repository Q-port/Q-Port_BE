// reqiures
require('dotenv').config();
const express = require('express');
const router = require('./routes');
const Http = require('http');

const cookieParser = require('cookie-parser');

const app = express();
const http = Http.createServer(app);
const port = process.env.EXPRESS_PORT || 3000;

// middlewares
app.use(cookieParser());
app.use(express.json());

http.listen(port, () => {
  console.log(`Start listen Server: ${port}`);
});

module.exports = http;

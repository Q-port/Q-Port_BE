// reqiures
require('dotenv').config();
const express = require('express');
const Http = require('http');
const cors = require('cors');
const helmet = require('helmet');

const cookieParser = require('cookie-parser');

const app = express();
const http = Http.createServer(app);
const router = express.Router();
const port = process.env.EXPRESS_PORT || 3000;

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use('/api/qnas', require('./routes/questions.route'));
app.use(express.urlencoded({ extended: false }), router);

http.listen(port, () => {
  console.log(`Start listen Server: ${port}`);
});

module.exports = http;

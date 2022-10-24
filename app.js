// reqiures
require('dotenv').config();
const express = require('express');
const Http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const {
  errorHandler,
  errorLogger,
} = require('./middlewares/error-hander.middleware');

const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');

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
app.use(errorLogger); // Error Logger
app.use(errorHandler); // Error Handler
app.use('/', require("./routes/signup.route"));

http.listen(port, () => {
  console.log(`Start listen Server: ${port}`);
});

module.exports = http;



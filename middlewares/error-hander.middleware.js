const errorLogger = (error, request, response, next) => {
  console.error(error);
  next(error); // errorLogger -> errorHandler
};

const errorHandler = (error, req, res, next) => {
  const status = error.status || 400;
  res.status(status);
  res.json({ ok: false, message: error.message });
};

module.exports = { errorLogger, errorHandler };

const errorMiddleware = (error, _req, res, _next) => {
  res.status(error.status || 500).json({ error: error.message });
};

module.exports = errorMiddleware;

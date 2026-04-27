function errorHandler(err, req, res, next) {
  console.error("Error:", err.message);

  return res.status(500).json({
    success: false,
    message: "Internal server error"
  });
}

module.exports = errorHandler;
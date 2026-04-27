const healthService = require("../services/health.service");

async function getHealth(req, res, next) {
  try {
    return res.status(200).json({
      success: true,
      message: "Service is healthy"
    });
  } catch (error) {
    return next(error);
  }
}

async function getDbHealth(req, res, next) {
  try {
    const result = await healthService.getDbHealth();
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getHealth,
  getDbHealth
};
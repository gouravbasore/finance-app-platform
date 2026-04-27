const express = require("express");
const dashboardController = require("../controllers/dashboard.controller");

const router = express.Router();

router.get("/summary", dashboardController.getDashboardSummary);
router.get("/monthly-summary", dashboardController.getMonthlySummary);

module.exports = router;
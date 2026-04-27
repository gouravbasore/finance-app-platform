const dashboardService = require("../services/dashboard.service");

const getDashboardSummary = async (req, res) => {
  try {
    const data = await dashboardService.getDashboardSummary();

    res.status(200).json({
      success: true,
      message: "Dashboard summary fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Dashboard Summary Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard summary",
    });
  }
};

const getMonthlySummary = async (req, res) => {
  try {
    const data = await dashboardService.getMonthlySummary();

    res.status(200).json({
      success: true,
      message: "Monthly summary fetched successfully",
      data,
    });
  } catch (error) {
    console.error("Monthly Summary Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch monthly summary",
    });
  }
};

module.exports = {
  getDashboardSummary,
  getMonthlySummary,
};
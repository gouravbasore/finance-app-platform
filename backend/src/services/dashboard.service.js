const dashboardRepository = require("../repositories/dashboard.repository");

const getDashboardSummary = async () => {
  return await dashboardRepository.getDashboardSummary();
};

const getMonthlySummary = async () => {
  return await dashboardRepository.getMonthlySummary();
};

module.exports = {
  getDashboardSummary,
  getMonthlySummary,
};
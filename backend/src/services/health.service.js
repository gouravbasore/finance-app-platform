const pool = require("../config/db");

async function getDbHealth() {
  await pool.query("SELECT 1");

  return {
    success: true,
    message: "Database connection healthy"
  };
}

module.exports = {
  getDbHealth
};
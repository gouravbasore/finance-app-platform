const pool = require("../config/db");

const createBudget = async (budget) => {
  const { name, amount, period } = budget;

  const query = `
    INSERT INTO budgets (name, amount, period)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [name, amount, period];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const getAllBudgets = async () => {
  const query = `
    SELECT * FROM budgets
    ORDER BY created_at DESC;
  `;

  const result = await pool.query(query);
  return result.rows;
};

const getBudgetById = async (id) => {
  const query = `
    SELECT * FROM budgets
    WHERE id = $1;
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const updateBudget = async (id, budget) => {
  const { name, amount, period } = budget;

  const query = `
    UPDATE budgets
    SET name = $1,
        amount = $2,
        period = $3,
        updated_at = NOW()
    WHERE id = $4
    RETURNING *;
  `;

  const values = [name, amount, period, id];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteBudget = async (id) => {
  const query = `
    DELETE FROM budgets
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
};
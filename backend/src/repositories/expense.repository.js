const pool = require("../config/db");

const createExpense = async (expense) => {
  const { title, amount, category, expense_date, budget_id, notes } = expense;

  const result = await pool.query(
    `INSERT INTO expenses 
     (title, amount, category, expense_date, budget_id, notes)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [title, amount, category, expense_date, budget_id || null, notes || null]
  );

  return result.rows[0];
};

const getAllExpenses = async () => {
  const result = await pool.query(
    "SELECT * FROM expenses ORDER BY created_at DESC"
  );
  return result.rows;
};

const getExpenseById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM expenses WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

const updateExpense = async (id, expense) => {
  const { title, amount, category, expense_date, budget_id, notes } = expense;

  const result = await pool.query(
    `UPDATE expenses
     SET title = $1,
         amount = $2,
         category = $3,
         expense_date = $4,
         budget_id = $5,
         notes = $6,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $7
     RETURNING *`,
    [title, amount, category, expense_date, budget_id || null, notes || null, id]
  );

  return result.rows[0];
};

const deleteExpense = async (id) => {
  const result = await pool.query(
    "DELETE FROM expenses WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
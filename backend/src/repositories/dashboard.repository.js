const pool = require("../config/db");

const getDashboardSummary = async () => {
  const totalBudgetsResult = await pool.query(`
    SELECT 
      COUNT(*) AS total_budgets,
      COALESCE(SUM(amount), 0) AS total_budget_amount
    FROM budgets
  `);

  const totalExpensesResult = await pool.query(`
    SELECT 
      COUNT(*) AS total_expenses,
      COALESCE(SUM(amount), 0) AS total_expense_amount
    FROM expenses
  `);

  const recentExpensesResult = await pool.query(`
    SELECT 
      id,
      title,
      amount,
      category,
      expense_date,
      budget_id,
      notes,
      created_at
    FROM expenses
    ORDER BY expense_date DESC, created_at DESC
    LIMIT 5
  `);

  const categorySummaryResult = await pool.query(`
    SELECT 
      category,
      COALESCE(SUM(amount), 0) AS total_amount,
      COUNT(*) AS total_transactions
    FROM expenses
    GROUP BY category
    ORDER BY total_amount DESC
  `);

  const totalBudgetAmount =
    totalBudgetsResult.rows[0].total_budget_amount || 0;

  const totalExpenseAmount =
    totalExpensesResult.rows[0].total_expense_amount || 0;

  const remainingBalance =
    Number(totalBudgetAmount) - Number(totalExpenseAmount);

  return {
    totalBudgets: Number(totalBudgetsResult.rows[0].total_budgets),
    totalBudgetAmount,
    totalExpenses: Number(totalExpensesResult.rows[0].total_expenses),
    totalExpenseAmount,
    remainingBalance: remainingBalance.toFixed(2),
    recentExpenses: recentExpensesResult.rows,
    categorySummary: categorySummaryResult.rows,
  };
};

const getMonthlySummary = async () => {
  const result = await pool.query(`
    SELECT 
      TO_CHAR(expense_date, 'YYYY-MM') AS month,
      COALESCE(SUM(amount), 0) AS total_amount,
      COUNT(*) AS total_transactions
    FROM expenses
    GROUP BY TO_CHAR(expense_date, 'YYYY-MM')
    ORDER BY month DESC
  `);

  return result.rows;
};

module.exports = {
  getDashboardSummary,
  getMonthlySummary,
};
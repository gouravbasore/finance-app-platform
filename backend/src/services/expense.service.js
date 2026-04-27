const expenseRepository = require("../repositories/expense.repository");

const createExpense = async (data) => {
  return await expenseRepository.createExpense(data);
};

const getAllExpenses = async () => {
  return await expenseRepository.getAllExpenses();
};

const getExpenseById = async (id) => {
  const expense = await expenseRepository.getExpenseById(id);
  if (!expense) {
    throw new Error("Expense not found");
  }
  return expense;
};

const updateExpense = async (id, data) => {
  const updated = await expenseRepository.updateExpense(id, data);
  if (!updated) {
    throw new Error("Expense not found");
  }
  return updated;
};

const deleteExpense = async (id) => {
  const deleted = await expenseRepository.deleteExpense(id);
  if (!deleted) {
    throw new Error("Expense not found");
  }
  return deleted;
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
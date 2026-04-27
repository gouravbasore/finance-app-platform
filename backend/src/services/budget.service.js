const budgetRepository = require("../repositories/budget.repository");

const createBudget = async (budgetData) => {
  const { name, amount, period } = budgetData;

  if (!name || !amount || !period) {
    throw new Error("Name, amount, and period are required");
  }

  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  return await budgetRepository.createBudget(budgetData);
};

const getAllBudgets = async () => {
  return await budgetRepository.getAllBudgets();
};

const getBudgetById = async (id) => {
  const budget = await budgetRepository.getBudgetById(id);

  if (!budget) {
    throw new Error("Budget not found");
  }

  return budget;
};

const updateBudget = async (id, budgetData) => {
  const existingBudget = await budgetRepository.getBudgetById(id);

  if (!existingBudget) {
    throw new Error("Budget not found");
  }

  return await budgetRepository.updateBudget(id, budgetData);
};

const deleteBudget = async (id) => {
  const existingBudget = await budgetRepository.getBudgetById(id);

  if (!existingBudget) {
    throw new Error("Budget not found");
  }

  return await budgetRepository.deleteBudget(id);
};

module.exports = {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
};
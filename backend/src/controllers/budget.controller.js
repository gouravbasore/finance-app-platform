const budgetService = require("../services/budget.service");

const createBudget = async (req, res, next) => {
  try {
    const budget = await budgetService.createBudget(req.body);

    res.status(201).json({
      success: true,
      message: "Budget created successfully",
      data: budget,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBudgets = async (req, res, next) => {
  try {
    const budgets = await budgetService.getAllBudgets();

    res.status(200).json({
      success: true,
      count: budgets.length,
      data: budgets,
    });
  } catch (error) {
    next(error);
  }
};

const getBudgetById = async (req, res, next) => {
  try {
    const budget = await budgetService.getBudgetById(req.params.id);

    res.status(200).json({
      success: true,
      data: budget,
    });
  } catch (error) {
    next(error);
  }
};

const updateBudget = async (req, res, next) => {
  try {
    const budget = await budgetService.updateBudget(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Budget updated successfully",
      data: budget,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBudget = async (req, res, next) => {
  try {
    const budget = await budgetService.deleteBudget(req.params.id);

    res.status(200).json({
      success: true,
      message: "Budget deleted successfully",
      data: budget,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
};
import api from "./axios";

export const getBudgets = async () => {
  const res = await api.get("/budgets");
  return res.data.data;
};

export const createBudget = async (data) => {
  const res = await api.post("/budgets", data);
  return res.data.data;
};
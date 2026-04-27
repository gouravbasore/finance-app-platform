import { useEffect, useState } from "react";
import { createBudget, getBudgets } from "../api/budgetApi";

function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    amount: "",
    period: "",
  });

  const fetchBudgets = async () => {
    try {
      const data = await getBudgets();
      setBudgets(data || []);
    } catch (err) {
      console.error("Failed to fetch budgets:", err);
      setBudgets([]);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createBudget({
        name: form.name,
        amount: Number(form.amount),
        period: form.period,
      });

      setForm({
        name: "",
        amount: "",
        period: "",
      });

      fetchBudgets();
    } catch (err) {
      console.error("Failed to create budget:", err);
    }
  };

  return (
    <div>
      <h1>Budgets</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Budget name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="period"
          placeholder="Period, example: April 2026"
          value={form.period}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Budget</button>
      </form>

      <h2>Budget List</h2>

      {budgets.length === 0 ? (
        <p>No budgets found.</p>
      ) : (
        budgets.map((b) => (
          <div key={b.id}>
            <strong>{b.name}</strong> - ${b.amount} - {b.period}
          </div>
        ))
      )}
    </div>
  );
}

export default Budgets;
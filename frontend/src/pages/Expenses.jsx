import { useEffect, useState } from "react";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    expense_date: "",
    budget_id: "",
    notes: "",
  });

  // Adjust if your backend uses /api/v1
  const API_URL = "http://localhost:3000/api/v1/expenses";

  // Fetch Expenses
  const fetchExpenses = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setExpenses(data.data || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Load on page load
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          amount: Number(form.amount),
          category: form.category,
          expense_date: form.expense_date,
          budget_id: Number(form.budget_id),
          notes: form.notes,
        }),
      });

      // Reset form
      setForm({
        title: "",
        amount: "",
        category: "",
        expense_date: "",
        budget_id: "",
        notes: "",
      });

      // Refresh list
      fetchExpenses();
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Expenses</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="title"
          placeholder="Expense title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          name="expense_date"
          type="date"
          value={form.expense_date}
          onChange={handleChange}
          required
        />

        <input
          name="budget_id"
          type="number"
          placeholder="Budget ID"
          value={form.budget_id}
          onChange={handleChange}
          required
        />

        <input
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />

        <button type="submit">Create Expense</button>
      </form>

      {/* LIST */}
      <h2>Expense List</h2>

      {expenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        expenses.map((expense) => (
          <div key={expense.id} style={{ marginBottom: "10px" }}>
            <strong>{expense.title}</strong> - ${expense.amount} -{" "}
            {expense.category} -{" "}
            {new Date(expense.expense_date).toLocaleDateString()}
          </div>
        ))
      )}
    </div>
  );
}

export default Expenses;
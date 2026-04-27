import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Budgets from "./pages/Budgets";
import Expenses from "./pages/Expenses";
import "./App.css";

function Home() {
  return (
    <div>
      <h1>Finance App</h1>
      <p>Frontend connected and ready.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/budgets">Budgets</Link>
        <Link to="/expenses">Expenses</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
-- =====================
-- TABLES
-- =====================

CREATE TABLE IF NOT EXISTS budgets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
    period VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
    category VARCHAR(100) NOT NULL,
    expense_date DATE NOT NULL,
    budget_id INTEGER REFERENCES budgets(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- DUMMY DATA (SAFE INSERT)
-- =====================

-- Budgets (only if empty)
INSERT INTO budgets (name, amount, period)
SELECT * FROM (
    VALUES
    ('Food', 600, 'April 2026'),
    ('Rent', 1500, 'April 2026'),
    ('Transport', 300, 'April 2026'),
    ('Entertainment', 400, 'April 2026'),
    ('Utilities', 250, 'April 2026')
) AS v(name, amount, period)
WHERE NOT EXISTS (SELECT 1 FROM budgets);

-- Expenses (only if empty)
INSERT INTO expenses (title, amount, category, expense_date, budget_id, notes)
SELECT * FROM (
    VALUES
    ('Groceries - Walmart', 120, 'Food', CURRENT_DATE - INTERVAL '1 day', 1, 'Weekly groceries'),
    ('Uber Ride', 25, 'Transport', CURRENT_DATE - INTERVAL '2 days', 3, 'Office commute'),
    ('Netflix Subscription', 15, 'Entertainment', CURRENT_DATE - INTERVAL '3 days', 4, 'Monthly subscription'),
    ('Electricity Bill', 90, 'Utilities', CURRENT_DATE - INTERVAL '4 days', 5, 'Monthly bill'),
    ('Dinner at Restaurant', 60, 'Food', CURRENT_DATE - INTERVAL '5 days', 1, 'Weekend dinner'),
    ('Gas Refill', 70, 'Transport', CURRENT_DATE - INTERVAL '6 days', 3, 'Car fuel'),
    ('Cinema Tickets', 40, 'Entertainment', CURRENT_DATE - INTERVAL '7 days', 4, 'Movie night'),
    ('Water Bill', 30, 'Utilities', CURRENT_DATE - INTERVAL '8 days', 5, 'Monthly bill'),
    ('Lunch', 20, 'Food', CURRENT_DATE - INTERVAL '9 days', 1, 'Office lunch'),
    ('Bus Pass', 50, 'Transport', CURRENT_DATE - INTERVAL '10 days', 3, 'Monthly pass')
) AS v(title, amount, category, expense_date, budget_id, notes)
WHERE NOT EXISTS (SELECT 1 FROM expenses);
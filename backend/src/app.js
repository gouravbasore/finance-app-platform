const express = require("express");
const config = require("./config/env");

// Routes
const healthRoutes = require("./routes/health.routes");
const budgetRoutes = require("./routes/budget.routes");
const expenseRoutes = require("./routes/expense.routes");

// Middlewares
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Global Middleware
app.use(express.json());

// API Routes
app.use(`${config.apiPrefix}/health`, healthRoutes);
app.use(`${config.apiPrefix}/budgets`, budgetRoutes);
app.use(`${config.apiPrefix}/expenses`, expenseRoutes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
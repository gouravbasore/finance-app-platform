const express = require("express");
const config = require("./config/env");

const healthRoutes = require("./routes/health.routes");
const budgetRoutes = require("./routes/budget.routes");

const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use(`${config.apiPrefix}/health`, healthRoutes);
app.use(`${config.apiPrefix}/budgets`, budgetRoutes);

// Handlers
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
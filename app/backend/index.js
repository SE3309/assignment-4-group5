const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const searchRoutes = require("./routes/searchRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Dynamically load all routes
const routesDir = path.join(__dirname, "routes");

fs.readdirSync(routesDir).forEach((file) => {
  if (file.endsWith("Routes.js")) {
    const route = require(path.join(routesDir, file));
    const routeName = file.replace("Routes.js", "").toLowerCase();
    app.use(`/api/${routeName}`, route);
  }
});

// Test endpoint
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.use("/api/search", searchRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

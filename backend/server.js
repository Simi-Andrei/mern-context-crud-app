const express = require("express");
require("dotenv").config();
require("colors");
const path = require("path");
const connectDB = require("./db/connectDB");
const { errorHandler } = require("./middleware/errorMiddleware");

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

connectDB();

app.use("/api/products", productRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});

module.exports = app;

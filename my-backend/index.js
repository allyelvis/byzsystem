import express from "express";
import db from "./models";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// User routes
app.post("/users", async (req, res) => {
  try {
    const user = await db.User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Product routes
app.post("/products", async (req, res) => {
  try {
    const product = await db.Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await db.Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Sale routes
app.post("/sales", async (req, res) => {
  try {
    const sale = await db.Sale.create(req.body);
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/sales", async (req, res) => {
  try {
    const sales = await db.Sale.findAll({ include: [db.Product] });
    res.json(sales);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

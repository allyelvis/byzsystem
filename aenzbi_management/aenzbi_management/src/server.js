const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/aenzbi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schemas and models
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
});
const SaleSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
  date: Date,
});
const UserSchema = new mongoose.Schema({ username: String, password: String });

const Product = mongoose.model("Product", ProductSchema);
const Sale = mongoose.model("Sale", SaleSchema);
const User = mongoose.model("User", UserSchema);

// Product Endpoints
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// Sale Endpoints
app.get("/sales", async (req, res) => {
  const sales = await Sale.find();
  res.json(sales);
});

app.post("/sales", async (req, res) => {
  const sale = new Sale(req.body);
  await sale.save();
  res.json(sale);
});

// User Endpoints
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

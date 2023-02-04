const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

//GET all products
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

//GET single product
const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.find({ id });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

//POST product
const createProduct = asyncHandler(async (req, res) => {
  const { name, quantity, price } = req.body;

  if (!name || !quantity || !price) {
    res.status(400);
    throw new Error("Please fill in all the fields");
  }

  const createdProduct = await Product.create({ name, quantity, price });

  res.status(201).json(createdProduct);
});

//PUT product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.find({ id });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const { name, quantity, price } = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: id },
    { name, quantity, price },
    { new: true }
  );

  res.status(200).json(updatedProduct);
});

//DELETE product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.find({ id });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const deletedProduct = await Product.findByIdAndDelete({ _id: id });

  res.status(200).json(deletedProduct);
});

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

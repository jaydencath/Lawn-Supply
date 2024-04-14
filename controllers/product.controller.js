"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const model = require("../models/product.model");

function getAll(req, res, next) {
  let products = model.getAll();
  try {
    res.render("products", { products: products, title: 'Lawn Supply' });
    // res.json(model.getAll());
  } catch (err) {
    console.error("Error while getting menu ", err.message);
    next(err);
  }
}

function getAllByCategory(req, res, next) {
  let category = req.params.category;
  let products = model.getAllByCategory(category);
  try {
    res.render("productsByCategory", { products: products, category: category, title: "Products in " + category + " Category" });
  } catch (err) {
    console.error("Error while getting products by category ", err.message);
    next(err);
  }
}

module.exports = {
  getAll,
  getAllByCategory,
};


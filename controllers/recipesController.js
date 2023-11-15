const Recipe = require("../models/recipe.js");

// Define your routes and CRUD operations here
const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe.js");

// INDEX route - Display a list of all recipes
router.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.render("index", { recipes });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// NEW route - Show a form to create a new recipe
router.get("/recipes/new", (req, res) => {
  res.render("new");
});

// CREATE route - Add a new recipe to the database
router.post("/recipes", async (req, res) => {
  try {
    await Recipe.create(req.body.recipe);
    res.redirect("/recipes");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// SHOW route - Display information about a specific recipe
router.get("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.render("show", { recipe });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// EDIT route - Show a form to edit a specific recipe
router.get("/recipes/:id/edit", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.render("edit", { recipe });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// UPDATE route - Update a specific recipe in the database
router.put("/recipes/:id", async (req, res) => {
  try {
    await Recipe.findByIdAndUpdate(req.params.id, req.body.recipe);
    res.redirect(`/recipes/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE route - Remove a specific recipe from the database
router.delete("/recipes/:id", async (req, res) => {
  try {
    await Recipe.findByIdAndRemove(req.params.id);
    res.redirect("/recipes");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

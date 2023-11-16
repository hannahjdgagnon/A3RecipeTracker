const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/recipeDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// define recipe chema
const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
  instructions: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

//CRUD operations
// routes
app.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.render("index", { recipes });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//post new recipe
app.post("/add", async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  const newRecipe = new Recipe({ title, ingredients, instructions });

  try {
    await newRecipe.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//post delete recipe
app.post("/delete/:id", async (req, res) => {
  const recipeId = req.params.id;

  try {
    await Recipe.findByIdAndDelete(recipeId);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//get the recipe
app.get("/edit/:id", async (req, res) => {
  const recipeId = req.params.id;

  try {
    const recipe = await Recipe.findById(recipeId);
    res.render("edit", { recipe });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//update the recipe
app.post("/update/:id", async (req, res) => {
  const recipeId = req.params.id;
  const { title, ingredients, instructions } = req.body;

  try {
    await Recipe.findByIdAndUpdate(recipeId, {
      title,
      ingredients,
      instructions,
    });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// delete confirmation message
app.post("/delete/:id", async (req, res) => {
  const recipeId = req.params.id;

  try {
    await Recipe.findByIdAndDelete(recipeId);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

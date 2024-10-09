const express = require("express");
const router = express.Router();
const Planet = require("../models/planet");


router.get("/", async (req, res) => {
  try {
    const planets = await Planet.find({});
    res.render("planets/index", { planets });
  } catch (err) {
    console.log(err);
    res.send("An error occurred while fetching planets.");
  }
});

router.get("/new", (req, res) => {
  res.render("planets/new");
});

router.post("/", async (req, res) => {
  req.body.hasLife = req.body.hasLife === "on";
  try {
    await Planet.create(req.body);
    res.redirect("/planets");
  } catch (err) {
    console.log(err);
    res.send("There was an error creating the planet.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id);
    res.render("planets/show", { planet });
  } catch (err) {
    console.log(err);
    res.send("An error occurred while fetching the planet details.");
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id);
    res.render("planets/edit", { planet });
  } catch (err) {
    console.log(err);
    res.send("An error occurred while fetching the planet for editing.");
  }
});

router.put("/:id", async (req, res) => {
  req.body.hasLife = req.body.hasLife === "on";
  try {
    await Planet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/planets/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.send("There was an error updating the planet.");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Planet.findByIdAndDelete(req.params.id);
    res.redirect("/planets");
  } catch (err) {
    console.log(err);
    res.send("There was an error deleting the planet.");
  }
});

module.exports = router;

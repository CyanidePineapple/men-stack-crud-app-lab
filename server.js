const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const app = express();
const port = 3000;

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/planets");
});

const planetController = require("./controllers/planetController");
app.use("/planets", planetController);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

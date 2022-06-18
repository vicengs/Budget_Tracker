/* ------------------------- */
/* Project  : Budget Tracker */
/* File     : seerver.js     */
/* Modify   : Vicente Garcia */
/* Date     : 06/18/2022     */
/* Modified : 06/18/2022     */
/* ------------------------- */
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3001;
// Add port (27017) to deploy
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/budget-tracker";

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
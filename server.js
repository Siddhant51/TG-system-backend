const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // import cors middleware
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors()); // use cors middleware
app.use(require("./routes"));

const DB =
  "mongodb+srv://Nikhil:Nikhil@tgsystem.el1zj1l.mongodb.net/TGsystem?retryWrites=true&w=majority";

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

mongoose
  .connect(DB)
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.log(err));

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookie = require("cookie-session");

const app = express();

//Cors
const corsSettings = {
  origin: "http://localhost:3001",
};
app.use(cors(corsSettings));

//Morgan
app.use(morgan("default"));

//Express settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Database
const db = require("./models");
db.sequelize.sync();

//Routes
require("./routes/auth.routes")(app);

//Default path
app.get("/", (req, res) => {
  res.json("Server is working");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

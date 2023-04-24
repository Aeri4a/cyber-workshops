const express = require("express");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const cookie = require("cookie-session");
const configS = require("./configS");

const app = express();

//Cors
const corsSettings = {
  origin: configS.ipdata.ipadress,
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
require("./routes/access.routes")(app);

//Default path
app.get("/", (req, res) => {
  res.json("Server is working");
});

const PORT = 8080;

// With HTTPS
/*
https
  .createServer(
    {
      key: fs.readFileSync("./ssl/server.key"), #CHANGE
      cert: fs.readFileSync("./ssl/server.crt"), #CHANGE
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
*/

// Without HTTPS
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const express = require("express");
const cors = require("cors");

const app = express();

const corsSettings = {
  origin: "http://localhost:3001",
};

app.use(cors(corsSettings));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("Server is working");
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

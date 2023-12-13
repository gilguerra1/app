const express = require("express");
const routesHandler = require("./routes/router.js");
const socketHandler = require("./routes/socket.js");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api", routesHandler);

const server = app.listen(5000, function () {
  console.log("Server is running on port " + 5000);
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
//create the express.js object
var app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let profiles = require("./profiles");
let articles = require("./articles");
let reviews = require("./reviews");
let messages = require("./messages");
let follows = require("./follows");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

// middleware to use for all requests
app.use(function (req, res, next) {
  // do logging
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const port = process.env.PORT || 8000;
app.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}..`));

app.use(profiles);
app.use(articles);
app.use(reviews);
app.use(messages);
app.use(follows);

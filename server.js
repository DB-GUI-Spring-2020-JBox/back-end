const express = require('express');
const bodyParser = require('body-parser');
//create the express.js object
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


let profiles = require('./profiles');
let articles = require('./articles');
let reviews = require('./reviews');
let messages = require('./messages');
let follows = require('./follows');

// middleware  to use for all requests
app.use(function(req, res, next) {
	// do logging
	console.log('Something is happening');
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


const port = process.env.PORT || 3201;
app.listen(port, () => console.log(`Listening on port ${port}..`));

app.use(profiles);
app.use(articles);
app.use(reviews);
app.use(messages);
app.use(follows);

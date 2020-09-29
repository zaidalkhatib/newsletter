var express = require("express");
const https = require("https");
var bodyParser = require("body-parser");
const {json} = require("body-parser");
const {request} = require("http");
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.URL);
console.log(process.env.AUTH);
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  console.log(firstName, lastName, email);
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merg_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  var jsonData = JSON.stringify(data);

  //   const KEY = "b92eae4f45c31ad4549f5160343564a1-us8";
  const url = process.env.URL;
  const options = {
    method: "POST",
    auth: process.env.AUTH,
  };
  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(response.statusCode);
      //   console.log(JSON.parse(data));
      if (response.statusCode === 200) {
        res.redirect("/success");
      }
    });
  });

  request.write(jsonData);
  request.end();
});

app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/success.html");
});
app.listen("3000", (req, res) => {
  console.log("running and refreshing");
});

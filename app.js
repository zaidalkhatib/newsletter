var express = require("express");
const https = require("https");
var bodyParser = require("body-parser");
const {json} = require("body-parser");
const {request} = require("http");
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
  const url = "https://us8.api.mailchimp.com/3.0/lists/4e2ef71c21";
  const options = {
    method: "POST",
    auth: "zaid:cac5cd8a3df15ecef33256cf65005907-us8",
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

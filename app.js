const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
});

app.post('/', function(req, res){
  var firstName = req.body.firstN;
  var lastName = req.body.lastN;
  var email = req.body.emaiL;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  const url = "https://us11.api.mailchimp.com/3.0/lists/f02dadca6e"

  const option = {
    method: "POST",
    auth: "nitin2008:0d634227e946840d3bb61d32caa7dce6-us11"
  }

  const request = https.request(url, option, function(response){
    response.on("data", function(data){

      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }


    });
  });

request.write(jsonData);
request.end();




});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(3000);




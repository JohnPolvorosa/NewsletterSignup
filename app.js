
const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.listen(proces.env.PORT||3000, function() {
    console.log("Server listening to port 3000");
});

// Get route
app.get("/", function(req,res) {
    res.sendFile(__dirname +"/signup.html");
});
// Post route
app.post("/", function(req,res) {
    let fName = req.body.fName;
    let lName = req.body.lName;
    let email = req.body.email;

    // console.log(fName + " " + lName + " " + email);
    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    let jsonData = JSON.stringify(data);
    // You have to replace the X with the number from your API key
    // https://usX.api.mailchimp.com/3.0/lists/"
    let url = "https://us4.api.mailchimp.com/3.0/lists/"
    // in case you want different IDs
    let paulListId = "777fba9b78";
    let urlC = url + paulListId;
    let options = {
        method: "POST", // POST Method
        auth: "dubcatcher:d878d0bd3eeca47fe09b7844a8159a60-us4" // authetntication
        // https://mailchimp.com/developer/guides/get-started-with-mailchimp-api-3/#Authentication_methods
    }
    // HOW TO PASS ONTO request url from MAILCHIMP
    const request = https.request(urlC, options, function(response) {
        response.on("data", function(data) {
            // console.log(JSON.parse(data));
        });

        // let requestStatus = https.request();

        if (response.statusCode === 200) {
            console.log(response.statusCode);
            res.sendFile(__dirname + "/success.html");
            // app.get("/");
        } else {
            console.log(response.statusCode);
            res.sendFile(__dirname + "/failure.html");
        }

    });
    
    // Pass jsonData into requesting url
    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req,res) {
    res.redirect("/");
})

// MAILCHIMP API TUTORIAL
//https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/18125203#questions
// API KEY
// d878d0bd3eeca47fe09b7844a8159a60-us4

// LIST ID Audience ID 
// 777fba9b78
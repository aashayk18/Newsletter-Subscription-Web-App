
const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");
const { url } = require("inspector");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/f277ce61ee";

    const options = {
            method: "POST",
            auth: "aashay1:c648e0df65ef88aa50066d80039e69e8-us8"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode===200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/")
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
});


// c648e0df65ef88aa50066d80039e69e8-us8

// f277ce61ee
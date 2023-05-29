const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
// this is how to find static files they will all be put into a  public floder
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/sign-up.html')
});

app.post('/', (req, res) => {

    let email = req.body.email;
    let fName = req.body.fName;
    let lName = req.body.lName;
    console.log(email);
    let data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };
    let jsonData = JSON.stringify(data);
    let url = 'https://us12.api.mailchimp.com/3.0/lists/43669aae35';
    // let url = 'https://${dc}.api.mailchimp.com/3.0/lists/43669aae35';

    const options = {
        method: 'post',
        auth: 'willie:b798bddaff72ef2396ad360bbfc597da-us12'
    }

    let request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/fail.html")
        }
        response.on('data', (data) => {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

})

app.listen(process.env.PORT || 3000, (req, res) => {
    console.log('app is listening');
});

//b798bddaff72ef2396ad360bbfc597da-us12

// add id    43669aae35
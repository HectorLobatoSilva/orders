const express = require('express');
const request = require('request')
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send({status: 200, message: "PONG"});
});

app.get( "/reports", ( req, res ) => {
    const ip = ""
    const token = ""
    const accessToken = Buffer.from(token).toString('base64')
    request.get(`http://${ip}/api/orders?display=full`,{
        "headers": {
            "Authorization": `Basic ${accessToken}`,
            "Output-Format": "JSON"
        }
    }, ( error, response, body ) => {
        if( !error && response.statusCode == 200 ) {
            const orders = JSON.parse(body)
            return res.send({status: 200, orders});
        }
    })
    // return res
} )

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
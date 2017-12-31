const net = require('net');
const http = require('http')
console.log("hi")
http.get("http://localhost:3000/api/todolists", function (res) {
    res.setEncoding('utf8')
    let body = ''
    res.on('data', function (d) {
        body += d
    });
    res.on('end', function () {
        try {
            var data = JSON.parse(body);
            console.log(data);
        } catch (err) {
            console.error('Unable to parse response as JSON', err);
        }
    })
}).on('error', function (err) {
//        console.error('Error with the request:', err.message);
});
const http = require('http');
const hostname = "127.0.0.1";
const port = 8080;

const fs = require('fs');

String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

const WebSocket = require('ws');
const wsServer = new WebSocket.Server({port: 3001});

const server = http.createServer(function (req, res) {
    if(req.url.indexOf('/index.html') === 0) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.setHeader("Access-Control-Allow-Origin", "*");
        fs.readFile('index.html', 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("<html><body>ERROR</body></html>");
            } else {
                res.end(data);
            }
        });
    } else {
        res.statusCode = 400;
        res.end();
    }
});
server.listen(port, hostname);

wsServer.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(JSON.parse(message).login);
        ws.send(JSON.stringify({'hashedLogin': JSON.parse(message).login.hashCode()}));
    });
});
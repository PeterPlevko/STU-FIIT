// toto bude light web server
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

let counter = 0;
const server = http.createServer(function (req, res){
    if (req.url === '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end('cointer: ' + counter);
    }
    else{
        res.statusCode = 400;
        res.end();
    }
})

server.listen(port, hostname, function (){
    console.log('Server running');
})
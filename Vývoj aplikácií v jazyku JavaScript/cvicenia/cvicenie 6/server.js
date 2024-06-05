// toto bude light web server
const express = require('express')
const app = express()
const port = 8080;  // do 1080
const mysql = require('mysql');

var connection = mysql.createConnection({
    host        : 'mydb',
    user        : 'root',
    password    : 'root',
    database    : 'produkty'
})

app.get('/data', (req, res) => {
    console.log('request /data')

    res.set({
        'Access-Control-Allow-Origin': '*'
    })

    connection.query('SELECT * FROM tprodukty', function(error, results) {
        if (error){
            res.set({
                'Content-Type': 'text/html'
            })
            res.status(500).send('<html><body><h1>DB ERROR</h1></body></html>')
        }

        console.log(results)
        res.status(200).json(results)
    })
})

var ival = setInterval(() => {
    console.log('trying to connect to DB')
    connection.connect((err) => {
        if (err) {
            console.error(err)
            return
        }

        clearInterval(ival)
        console.log('DB connected')
        app.listen(port, ()=> {
            console.log("express server running v1")
        })
    })
}, 5000)
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const cors = require('cors')
const {add} = require("nodemon/lib/rules");
const app = express();
const port = 3332;
app.use(cors());

function generateRandomToken() {
    const token = [];
    const possible = 'bcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < 60; i++) {
        token[i] = possible.charAt(Math.floor(Math.random() * possible.length));
    }
    token[Math.floor(Math.random() * 19)] = 'a';
    token[Math.floor(Math.random() * 20) + 19] = 'a';
    token[Math.floor(Math.random() * 20) + 39] = 'a';
    return token.join('');
}

function createApi(port) {
    return axios.create({
        baseURL: `http://127.0.0.1:${port}`, // Custom base URL with the specified port
        withCredentials: true,
        headers: {
            Authorization: 'Bearer timacikusiacikmamalepele',
        },
    });
}
const addCatApi = createApi(3333);
const catNamesApi = createApi(3334);
const searchCatApi = createApi(3335);

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.post('/cats/names/:character', async (req, res) => {
    const data = req.body;
    catNamesApi.post('cats/names/' + data.character, data)
        .then(response => {
            console.log('POST request cats/names/ successful');
            res.json(response.data);
        })
        .catch(error => {
            console.error('Error making POST request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.post('/cats/all/', async (req, res) => {
    const data = req.body;
    searchCatApi.post('cats/all/', data)
        .then(response => {
            console.log('POST request cats/all/ successful');
            res.json(response.data);
        })
        .catch(error => {
            console.error('Error making POST request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.get('/cats/:id', async (req, res) => {
    const id = req.params.id;
    searchCatApi.get('cats/' + id)
        .then(response => {
            console.log('GET request /cats/:id successful');
            res.json(response.data);
        })
        .catch(error => {
            console.error('Error making GET request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.post('/cats/:id', async (req, res) => {
    const cat = req.body;
    searchCatApi.post('cats/' + cat.id, cat)
        .then(response => {
            console.log('POST request /cats/:id successful');
            res.json(response.data);
        })
        .catch(error => {
            console.error('Error making POST request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.post('/cats/', async (req, res) => {
    const cat = req.body;
    addCatApi.post('cats/', cat)
        .then(response => {
            console.log('POST request cats/ successful');
            res.json(response.data);
        })
        .catch(error => {
            console.error('Error making POST request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.delete('/cats/:id', async (req, res) => {
    const catId = req.params.id;
    searchCatApi.delete('cats/' + catId)
        .then(response => {
            console.log('DELETE request /cats/:id successful');
            res.json(response.data);
        })
        .catch(error => {
            console.error('Error making DELETE request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`API Gateway is running on http://localhost:${port}`);
});

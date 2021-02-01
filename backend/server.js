import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// example routes

app.get('/', (req, res) => {
    // curl
    return res.send('Received a GET HTTP method');
});

app.post('/', (req, res) => {
    // curl -X POST
    return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
    // curl -X PUT
    return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
    // curl -X DELETE
    return res.send('Received a DELETE HTTP method');
});

app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}!`),
);

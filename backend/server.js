import 'dotenv/config';
import cors from 'cors';
import express from 'express';

// db
require('./data/reddit-db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(require('./routes'));



app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}!`),
);

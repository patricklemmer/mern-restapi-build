// Express imports
import express from 'express';

// Package imports
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';

// Library imports
import mongoose from 'mongoose';

// Middleware imports
import cors from 'cors';

// Module imports
import http from 'http';

// Config imports
import 'dotenv/config';

// Router imports
import router from './router';

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const apiURL = process.env.API_URL;

server.listen(apiURL, () => {
  console.log(`Server running on http://localhost:${apiURL}`);
});

const MONGO_URL = process.env.MONGO_URL_STRING;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());

import express, { Express } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';

import spotify_router from './routes/spotify';

import { config } from './config';

const app: Express = express();

// * MiddleWares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));
app.use(compression({ level: 9 }));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(`/api/${config.API_VERSION}/spotify`, spotify_router);

// * OPR_KEY MiddleWare
// app.use((req, res, next) => {
//   const isOprCorrect = req.headers.access_token === process.env.OPR_KEY;

//   if (isOprCorrect) {
//     // *Do Nothing
//   } else {
//     return responseHelper.unauthorized(res);
//   }

//   next();
// });

export default app;

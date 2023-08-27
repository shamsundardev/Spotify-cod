import dotenv from 'dotenv';

import app from './app';

import { config } from './config';
import { start_db } from './config/db';

import { set_spotify_token } from './util';

dotenv.config({ path: `./config.env` });

const port = process.env.PORT || 3000;

start_db();

(async () => {
  await set_spotify_token();
})();

//  Starting the server
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

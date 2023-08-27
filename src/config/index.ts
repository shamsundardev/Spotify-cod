import dotenv from 'dotenv';

dotenv.config({ path: `./config.env` });

export const config = {
  API_VERSION: process.env.API_VERSION,
  DATABASE_HOST: process.env.DATABASE_HOST ?? '',
  DATABASE_NAME: process.env.DATABASE_NAME ?? '',
  DATABASE_USER: process.env.DATABASE_USER ?? '',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD ?? '',
  SPOTIFY_CLIENT: process.env.SPOTIFY_CLIENT,
  SPOTIFY_SECRET: process.env.SPOTIFY_SECRET,
  SPOTIFY_ACCESS_TOKEN: ''
};

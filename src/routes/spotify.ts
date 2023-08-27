import express, { Router, Response } from 'express';

import {
  save_track,
  search_track_by_isrc,
  search_track_by_artist
} from '../controllers/spotify_controller';

import type {
  SaveTrackRequestType,
  SearchTrackRequestType
} from '../../src/types/spotify';

const spotify_router: Router = express.Router();

spotify_router
  .get('/search_track', (req: SaveTrackRequestType, res: Response) =>
    save_track(req, res)
  )
  .get('/search_by_isrc', (req: SaveTrackRequestType, res: Response) =>
    search_track_by_isrc(req, res)
  )
  .get('/search_by_artist', (req: SearchTrackRequestType, res: Response) =>
    search_track_by_artist(req, res)
  );

export default spotify_router;

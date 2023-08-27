import { config } from '../config';

import { SPOTIFY_SEARCH_TYPE_ENUM } from '../types/utils';
import type { SPOTIFY_SEARCH_TYPE, SPOTIFY_TRACK_TYPE } from '../types/utils';

export const fetch_spotify_token = async (): Promise<{
  access_token: string;
}> => {
  let spotify_data = {
    access_token: ''
  };

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(config.SPOTIFY_CLIENT + ':' + config.SPOTIFY_SECRET).toString(
            'base64'
          ),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: 'grant_type=client_credentials'
    });

    const response_data = await response.json();

    spotify_data.access_token = response_data.access_token;
  } catch (error) {
    throw new Error(`Error in fetching token ${error}`);
  }

  return spotify_data;
};

export const set_spotify_token = async (force_update = false) => {
  if (!config.SPOTIFY_ACCESS_TOKEN || force_update) {
    const spotify_data = await fetch_spotify_token();

    config.SPOTIFY_ACCESS_TOKEN = spotify_data.access_token;
  }
};

export const search_spotify = async ({
  isrc,
  type = SPOTIFY_SEARCH_TYPE_ENUM.TRACK
}: {
  isrc: string;
  type?: SPOTIFY_SEARCH_TYPE;
}): Promise<{
  imageUrl: string;
  artists: string[];
  name: string;
}> => {
  const result = {
    imageUrl: '',
    artists: [''],
    name: ''
  };

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=isrc:${isrc}&type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${config.SPOTIFY_ACCESS_TOKEN}`
        }
      }
    );

    const data = await response.json();

    if (data?.tracks?.items?.length) {
      const first_track: SPOTIFY_TRACK_TYPE = data.tracks.items[0];

      result.imageUrl = first_track?.album?.images?.[0]?.url;
      result.artists = first_track?.artists?.length
        ? first_track.artists.map(artist => artist.name)
        : [];
      result.name = first_track.name;
    }
  } catch (error) {
    throw new Error(`Error in Searching Track ${error}`);
  }

  return result;
};

export const get_error = (_error: unknown) => {
  let error: {
    message: string;
    name: string;
    stack?: string;
  } = {
    message: '',
    name: '',
    stack: ''
  };

  if (_error instanceof Error) {
    error.message = _error.message;
    error.name = _error.name;
    error.stack = _error.stack;
  }

  return error;
};

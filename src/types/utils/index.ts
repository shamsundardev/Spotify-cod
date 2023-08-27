export enum SPOTIFY_SEARCH_TYPE_ENUM {
  TRACK = 'track',
  ALBUM = 'album'
}

export type SPOTIFY_SEARCH_TYPE = SPOTIFY_SEARCH_TYPE_ENUM;

export type SPOTIFY_TRACK_TYPE = {
  album: {
    images: {
      url: string;
    }[];
  };
  artists: {
    name: string;
  }[];
  name: string;
};

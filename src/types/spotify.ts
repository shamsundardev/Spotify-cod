import { Request } from 'express';

// interfaces
export interface ReqParams {}
export interface ReqBody {}
export interface ResBody {}
export interface ReqQuery {}

export interface SaveTrackReqQuery extends ReqQuery {
  isrc: string;
}

export interface SearchTrackReqQuery extends ReqQuery {
  artist: string;
}

export type SaveTrackRequestType = Request<
  ReqParams,
  ReqBody,
  ResBody,
  SaveTrackReqQuery
>;

export type SearchTrackRequestType = Request<
  ReqParams,
  ReqBody,
  ResBody,
  SearchTrackReqQuery
>;

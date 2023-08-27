import { Optional } from 'sequelize';

export interface TrackISRCAttributes {
  id: number;
  track_isrc: string;
  track_name: string;

  active: boolean;
  created_at: Date;
}
export interface TrackISRCInput extends Optional<TrackISRCAttributes, 'id'> {}
export interface TrackISRCOutput extends Required<TrackISRCAttributes> {}

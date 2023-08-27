import { TrackIsrc } from './track_isrc.model';
import { TrackDetails } from './track_details.model';

TrackIsrc.hasOne(TrackDetails, {
  sourceKey: 'id',
  foreignKey: 'track_isrc_id',
  as: 'trackDetails'
});

TrackDetails.belongsTo(TrackIsrc, {
  foreignKey: 'track_isrc_id',
  as: 'trackIsrc'
});

export const db = {
  TrackIsrc,
  TrackDetails
};

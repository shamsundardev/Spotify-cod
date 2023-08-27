import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize';

import { TrackIsrc } from './track_isrc.model';

import { sq } from '../config/db';

class TrackDetails extends Model<
  InferAttributes<TrackDetails>,
  InferCreationAttributes<TrackDetails>
> {
  declare id: CreationOptional<number>;

  declare track_isrc_id: ForeignKey<TrackIsrc['id']>;
  declare image_url: string;
  declare artists_name: string | string[];
  declare active: CreationOptional<boolean>;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

TrackDetails.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    image_url: DataTypes.STRING(5000),
    artists_name: DataTypes.ARRAY(DataTypes.STRING),
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  },
  {
    sequelize: sq,
    tableName: 'track_details',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
  }
);

export { TrackDetails };

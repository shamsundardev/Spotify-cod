import {
  Association,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  HasOneCreateAssociationMixin
} from 'sequelize';

import { TrackDetails } from './track_details.model';

import { sq } from '../config/db';

class TrackIsrc extends Model<
  InferAttributes<TrackIsrc>,
  InferCreationAttributes<TrackIsrc>
> {
  declare id: CreationOptional<number>;

  declare isrc_code: string;
  declare track_name: string;
  declare active: CreationOptional<boolean>;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  declare createTrackDetails: HasOneCreateAssociationMixin<TrackDetails>;

  declare static associations: {
    track_details: Association<TrackIsrc, TrackDetails>;
  };
}

TrackIsrc.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    isrc_code: DataTypes.STRING(200),
    track_name: DataTypes.STRING(200),

    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  },
  {
    sequelize: sq,
    tableName: 'track_isrc',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export { TrackIsrc };

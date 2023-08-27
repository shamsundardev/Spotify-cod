import { Request, Response } from 'express';
import { Op, literal, where } from 'sequelize';

import { db } from '../models';

import { search_spotify, get_error } from '../util';
import { error_res, success_res } from '../util/response.helper';

import type {
  ReqParams,
  ReqBody,
  ResBody,
  SaveTrackReqQuery,
  SearchTrackRequestType
} from '../types/spotify';
import { CODES_ENUM, MESSAGES_ENUM } from '../types';

export const save_track = async (
  req: Request<ReqParams, ReqBody, ResBody, SaveTrackReqQuery>,
  res: Response
) => {
  try {
    const isrc = req.query.isrc;

    const search_result_isrc = await db.TrackIsrc.findOne({
      where: {
        isrc_code: isrc
      }
    });

    if (search_result_isrc?.dataValues?.id) {
      return success_res({
        res,
        code: CODES_ENUM.ALREADY_EXIST,
        message: MESSAGES_ENUM.ALREADY_EXIST,
        success: false
      });
    }

    const search_result = await search_spotify({
      isrc
    });

    if (search_result.name) {
      const track_isrc_response = await db.TrackIsrc.create({
        isrc_code: isrc,
        track_name: search_result.name
      });

      await track_isrc_response.createTrackDetails({
        artists_name: search_result.artists,
        image_url: search_result.imageUrl
      });

      return success_res({
        res,
        code: CODES_ENUM.SUCCESS,
        message: MESSAGES_ENUM.SUCCESSFULLY_SAVED
      });
    }

    return success_res({
      res,
      code: CODES_ENUM.NOT_FOUND,
      message: MESSAGES_ENUM.UNABLE_TO_FIND,
      success: false
    });
  } catch (error: unknown) {
    error_res({
      res,
      error: get_error(error),
      source: 'Find and Save ISRC API'
    });
  }
};

export const search_track_by_isrc = async (
  req: Request<ReqParams, ReqBody, ResBody, SaveTrackReqQuery>,
  res: Response
) => {
  try {
    const isrc = req.query.isrc;

    if (!isrc) {
      return success_res({
        res,
        code: CODES_ENUM.BAD_REQUEST,
        message: `${MESSAGES_ENUM.REQUIRED_PARAMS_ARE_NOT_PRESENT} (isrc)`,
        success: false
      });
    }

    const search_result_isrc = await db.TrackIsrc.findOne({
      where: {
        isrc_code: isrc
      },
      include: {
        model: db.TrackDetails,
        as: 'trackDetails'
      }
    });

    if (search_result_isrc?.dataValues?.id) {
      return success_res({
        res,
        code: CODES_ENUM.SUCCESS,
        message: MESSAGES_ENUM.SUCCESS,
        data: search_result_isrc?.dataValues
      });
    }

    return success_res({
      res,
      code: CODES_ENUM.NOT_FOUND,
      message: MESSAGES_ENUM.UNABLE_TO_FIND,
      success: false
    });
  } catch (error) {
    error_res({
      res,
      error: get_error(error),
      source: 'Find By ISRC API'
    });
  }
};

export const search_track_by_artist = async (
  req: SearchTrackRequestType,
  res: Response
) => {
  try {
    const artist = req.query.artist;

    if (!artist) {
      return success_res({
        res,
        code: CODES_ENUM.BAD_REQUEST,
        message: `${MESSAGES_ENUM.REQUIRED_PARAMS_ARE_NOT_PRESENT} (artist)`,
        success: false
      });
    }

    const search_result_artist = await db.TrackDetails.findAll({
      where: where(literal(`ARRAY_TO_STRING(artists_name, ', ')`), {
        [Op.iLike]: `%${artist}%`
      }),
      include: {
        model: db.TrackIsrc,
        as: 'trackIsrc'
      }
    });

    if (search_result_artist?.[0]?.dataValues?.id) {
      return success_res({
        res,
        code: CODES_ENUM.SUCCESS,
        message: MESSAGES_ENUM.SUCCESS,
        data: search_result_artist
      });
    }

    return success_res({
      res,
      code: CODES_ENUM.NOT_FOUND,
      message: MESSAGES_ENUM.UNABLE_TO_FIND,
      success: false
    });
  } catch (error) {
    error_res({
      res,
      error: get_error(error),
      source: 'Find By Artist API'
    });
  }
};

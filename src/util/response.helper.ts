import type { Response } from 'express';
import { JSON_FORMAT } from '../types';

const json_format: JSON_FORMAT = {
  code: -1,
  success: false,
  message: '',
  data: [],
  error: null,
  sent_at: null
};

const send_response = (
  res: Response,
  data: {
    code: number;
    success: boolean;
    message: string;
    data: unknown;
    error: Error;
    sent_at: Date;
  }
) => {
  res.status(data.code).json(data);
};

const unauthorized = (res: Response) => {
  const json = JSON.parse(JSON.stringify(json_format));
  json.code = 403;
  json.message =
    "Unauthorized request. It seems either you didn't provide the auth token, or you don't have the access to the module you are calling";
  send_response(res, json);
};

const success_res = ({
  res,
  code,
  data,
  message,
  success = true
}: JSON_FORMAT & {
  res: Response;
}) => {
  const json = JSON.parse(JSON.stringify(json_format));
  json.code = code;
  json.success = success;
  json.data = data;
  if (success) {
    json.message = message;
  } else {
    json.error = message;
  }
  json.sent_at = new Date();

  send_response(res, json);
};

const error_res = ({
  res,
  error,
  errorCode,
  source
}: {
  res: Response;
  error: Error;
  errorCode?: number;
  source?: string;
}) => {
  const json = JSON.parse(JSON.stringify(json_format));

  json.code = errorCode || 502;
  json.message = error.message;
  json.error = error;
  json.sentAt = new Date();
  // send email only when the error is undefined or the fatal error
  console.log('source in error: ', source, error, errorCode);

  send_response(res, json);
};

export { unauthorized, error_res, success_res };

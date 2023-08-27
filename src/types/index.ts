export enum CODES_ENUM {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  ALREADY_EXIST = 409,
  INTERVAL_SERVER_ERROR = 500
}

export enum MESSAGES_ENUM {
  ALREADY_EXIST = 'Already Exist',
  SUCCESSFULLY_SAVED = 'Successfully Saved',
  UNABLE_TO_FIND = 'Unable To Find',
  REQUIRED_PARAMS_ARE_NOT_PRESENT = 'Required params are not present',
  SUCCESS = 'Success'
}

export type JSON_FORMAT = {
  code: number;
  success?: boolean;
  sent_at?: Date | null;
  message?: string;
  data?: unknown;
  error?: Error | null;
};

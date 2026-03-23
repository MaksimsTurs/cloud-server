const HTTP_ERROR_CODES = {
  //Client errors
  BAD_REQUEST:            400,
  UNAUTHORIZED:           401,
  FORBIDDEN:              403,
  NOT_FOUND:              404,
  REQUEST_TIMEOUT:        408,
  CONFLICT:               409,
  TO_MANY_REQUESTS:       429,
  //Server errors
  INTERNAL_SERVER_ERROR:  500,
  SERVICE_UNAVAILABLE:    503
} as const;

export default HTTP_ERROR_CODES;

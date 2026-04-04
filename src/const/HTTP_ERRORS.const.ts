const HTTP_ERRORS = {
  //Client errors
  BAD_REQUEST:      (message?: string) => ({ code: 400, message: message || 'Bad Request!' }),
  UNAUTHORIZED:     (message?: string) => ({ code: 401, message: message || 'Unauthorized!' }),
  FORBIDDEN:        (message?: string) => ({ code: 403, message: message || 'Forbidden!' }),
  NOT_FOUND:        (message?: string) => ({ code: 404, message: message || 'Not found!' }),
  REQUEST_TIMEOUT:  (message?: string) => ({ code: 408, message: message || 'Request timeout!' }),
  CONFLICT:         (message?: string) => ({ code: 409, message: message || 'Conflict!' }),
  TO_MANY_REQUESTS: (message?: string) => ({ code: 429, message: message || 'Too many requests!' }),
  //Server errors
  INTERNAL_SERVER_ERROR: (message?: string) => ({ code: 500, message: message || 'Internal server error!' }),
  SERVICE_UNAVAILABLE:   (message?: string) => ({ code: 503, message: message || 'Service unavailable!' })
} as const;

export default HTTP_ERRORS;

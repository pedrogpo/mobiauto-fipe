export class HttpError {
  message: string
  statusCode: number

  constructor(message: string, statusCode: number) {
    this.message = message
    this.statusCode = statusCode
  }
}

export const httpError = (statusCode: number, message: string): HttpError => {
  return { message, statusCode }
}

export const httpErrors = {
  badRequest: (message: string) => httpError(400, message),
  unauthorized: (message: string) => httpError(401, message),
  forbidden: (message: string) => httpError(403, message),
  notFound: (message: string) => httpError(404, message),
  methodNotAllowed: (message: string) => httpError(405, message),
  internalServerError: (message: string) => httpError(500, message),
}

export const handleError = (err: any): HttpError => {
  if (!err.message || !err.statusCode) {
    return httpErrors.internalServerError('Something went wrong')
  }

  if (err.statusCode === 500) {
    return httpErrors.internalServerError(err.message)
  }

  if (err.statusCode === 403) {
    return httpErrors.forbidden("You don't have permission to do this.")
  }

  if (err.statusCode === 405) {
    return httpErrors.methodNotAllowed('Method Not Allowed')
  }

  return {
    message: err.message,
    statusCode: err.statusCode,
  }
}

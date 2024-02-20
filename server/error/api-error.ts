export default class ApiError extends Error {
  statusCode: number
  message: string

  constructor(code: number, message: string) {
    super()
    this.statusCode = code
    this.message = message
  }

  static badRequest(msg: typeof ApiError.prototype.message) {
    return new ApiError(400, msg)
  }

  static unauthorized(msg = 'Unauthorized') {
    return new ApiError(401, msg)
  }

  static forbidden(msg: typeof ApiError.prototype.message) {
    return new ApiError(403, msg)
  }

  static internal(msg: typeof ApiError.prototype.message) {
    return new ApiError(500, msg)
  }
}

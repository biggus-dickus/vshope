export default class ApiError extends Error {
  statusCode: number

  constructor(code: number, message: string) {
    super()
    this.statusCode = code
    this.message = message
  }

  static badRequest(message: string) {
    return new ApiError(400, message)
  }

  static internal(message: string) {
    return new ApiError(500, message)
  }

  static forbidden(message: string) {
    return new ApiError(403, message)
  }
}

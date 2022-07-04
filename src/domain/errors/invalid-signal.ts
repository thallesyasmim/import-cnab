export class InvalidSignalError extends Error {
  constructor(signal: string) {
    super(`Signal: ${signal} is invalid`)
    this.name = this.constructor.name
    this.message = 'Signs must be + or -'
  }
}

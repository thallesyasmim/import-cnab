export class InvalidCardError extends Error {
  constructor(cpf: string) {
    super(`Card: ${cpf} is invalid`)
    this.name = this.constructor.name
    this.message = 'Card does not contain 12 digits.'
  }
}

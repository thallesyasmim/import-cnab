export class InvalidNameError extends Error {
  constructor(name: string) {
    super(`Name: ${name} is invalid`)
    this.name = this.constructor.name
    this.message = 'Names must have a minimum of 4 characters and a maximum of 255.'
  }
}

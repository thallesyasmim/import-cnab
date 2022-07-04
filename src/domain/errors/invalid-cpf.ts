export class InvalidCpfError extends Error {
  constructor(cpf: string) {
    super(`CPF: ${cpf} is invalid`)
    this.name = this.constructor.name
    this.message = 'CPF does not contain 11 digits.'
  }
}

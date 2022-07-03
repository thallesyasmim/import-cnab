import { Either, left, right } from '@/shared/either'
import { InvalidCpfError } from '@/domain/errors'

export class Cpf {
  private constructor(private readonly cpf: string) {
    Object.freeze(this)
  }

  get value(): string {
    return this.cpf
  }

  static create(cpf: string): Either<InvalidCpfError, Cpf> {
    if (!cpf || !Cpf.isValid(cpf.trim())) {
      return left(new InvalidCpfError(cpf))
    }

    return right(new Cpf(cpf))
  }

  static isValid(cpf: string): boolean {
    const pattern =
      /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
    return pattern.test(cpf)
  }
}

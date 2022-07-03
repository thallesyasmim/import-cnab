import { Either, left, right } from '@/shared/either'
import { InvalidNameError } from '@/domain/errors'

export class Name {
  private constructor(private readonly name: string) {
    Object.freeze(this)
  }

  get value(): string {
    return this.name
  }

  static create(name: string): Either<InvalidNameError, Name> {
    if (!name || !Name.isValid(name.trim())) {
      return left(new InvalidNameError(name))
    }

    return right(new Name(name))
  }

  static isValid(name: string): boolean {
    return name.length > 2 && name.length < 256
  }
}

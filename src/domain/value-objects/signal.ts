import { Either, left, right } from '@/shared/either'
import { InvalidSignalError } from '@/domain/errors'

export class Signal {
  private constructor(private readonly signal: string) {
    Object.freeze(this)
  }

  get value(): string {
    return this.signal
  }

  static create(signal: string): Either<InvalidSignalError, Signal> {
    if (!signal || !Signal.isValid(signal.trim())) {
      return left(new InvalidSignalError(signal))
    }

    return right(new Signal(signal))
  }

  static isValid(signal: string): boolean {
    return signal === '+' || signal === '-'
  }
}

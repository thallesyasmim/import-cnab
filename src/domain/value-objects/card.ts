import { Either, left, right } from '@/shared/either'
import { InvalidCardError } from '@/domain/errors'

export class Card {
  private constructor(private readonly card: string) {
    Object.freeze(this)
  }

  get value(): string {
    return this.card
  }

  static create(card: string): Either<InvalidCardError, Card> {
    if (!card || !Card.isValid(card.trim())) {
      return left(new InvalidCardError(card))
    }

    return right(new Card(card))
  }

  static isValid(card: string): boolean {
    return card.length === 12
  }
}

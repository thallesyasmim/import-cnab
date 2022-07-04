export interface Cnab {
  normalize(register: string): Cnab.Result
}

export namespace Cnab {
  export type Result = {
    type: number
    date: Date
    value: number
    cpf: string
    card: string
    owner: string
    shop: string
  }
}

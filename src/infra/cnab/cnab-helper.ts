import { Cnab } from '@/application/contracts'
import { injectable } from 'tsyringe'

@injectable()
export class CnabHelper implements Cnab {
  normalize(register: string): Cnab.Result {
    const type = Number(register.slice(0, 1))
    const year = register.slice(1, 5)
    const month = register.slice(5, 7)
    const day = register.slice(7, 9)
    const value = Number(register.slice(9, 19)) / 100
    const hour = `${register.slice(42, 44)}:${register.slice(44, 46)}:${register.slice(46, 48)}`

    return {
      type,
      date: new Date(`${year}-${month}-${day}T${hour}`),
      value,
      cpf: register.slice(19, 30),
      card: register.slice(30, 42),
      owner: register.slice(48, 62).trim(),
      shop: register.slice(62, 81).trim()
    }
  }
}

import * as bcrypt from 'bcrypt';

export function hash(password: string): string {
  return bcrypt.hashSync(password, bcrypt.genSaltSync())
}

export function compare(input: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(input, hashedPassword)
}
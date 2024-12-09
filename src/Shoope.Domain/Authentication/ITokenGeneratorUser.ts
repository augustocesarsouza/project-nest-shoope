import { User } from '../Entities/User';
import { InfoErrors } from '../InfoErrors/InfoErrors';
import { TokenOutValue } from './TokenOutValue';

export abstract class ITokenGeneratorUser {
  abstract Generator(user: User, expiresIn: string): InfoErrors<TokenOutValue | null>;
}

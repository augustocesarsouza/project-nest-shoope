import { User } from 'src/Shoope.Domain/Entities/User';
import { InfoErrors } from 'src/Shoope.Domain/InfoErrors/InfoErrors';

export abstract class ISendEmailUser {
  abstract SendCodeRandom(user: User, code: number): Promise<InfoErrors<string>>;
}

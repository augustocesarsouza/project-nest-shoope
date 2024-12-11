import { User } from 'src/Shoope.Domain/Entities/User';
import { InfoErrors } from 'src/Shoope.Domain/InfoErrors/InfoErrors';

export abstract class ISendEmailBrevo {
  abstract SendCode(user: User, code: number): Promise<InfoErrors<string>>;
}

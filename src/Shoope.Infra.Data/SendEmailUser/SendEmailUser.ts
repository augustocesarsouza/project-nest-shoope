import { Injectable } from '@nestjs/common';
import { ISendEmailUser } from './Interface/ISendEmailUser';
import { InfoErrors } from 'src/Shoope.Domain/InfoErrors/InfoErrors';
import { ISendEmailBrevo } from '../UtilityExternal/Interface/ISendEmailBrevo';
import { User } from 'src/Shoope.Domain/Entities/User';

@Injectable()
export class SendEmailUser implements ISendEmailUser {
  constructor(private readonly _sendEmailBrevo: ISendEmailBrevo) {}

  async SendCodeRandom(user: User, code: number): Promise<InfoErrors<string>> {
    try {
      const resultSend = await this._sendEmailBrevo.SendCode(user, code);

      if (!resultSend.isSuccess) return InfoErrors.fail<string | null>(resultSend.message);

      return InfoErrors.ok('all set');
    } catch (error) {
      return InfoErrors.fail<string | null>(error.message || 'An unexpected error occurred');
    }
  }
}

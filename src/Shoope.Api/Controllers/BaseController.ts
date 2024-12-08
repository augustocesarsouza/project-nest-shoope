import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { IBaseController } from '../ControllersInterfaces/IBaseController';
import { UserAuthDTO } from 'src/Shoope.Application/DTOs/UserAuthDTO';
import { ICurrentUser } from 'src/Shoope.Domain/Authentication/ICurrentUser';

@Injectable()
export class BaseController implements IBaseController {
  Validator(currentUser: ICurrentUser | null): UserAuthDTO | null {
    if (!currentUser || currentUser.isValid === false) {
      return null;
    }

    if (!currentUser.phone) {
      return null;
    }

    return new UserAuthDTO({ phone: currentUser.phone });
  }

  @HttpCode(HttpStatus.FORBIDDEN)
  Forbidden() {
    return {
      code: 'not_acesso_negadofound',
      message: 'Usuario não contem as devidas informações necessarias para acesso',
    };
  }
}

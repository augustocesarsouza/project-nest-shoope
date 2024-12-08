import { UserAuthDTO } from 'src/Shoope.Application/DTOs/UserAuthDTO';
import { ICurrentUser } from 'src/Shoope.Domain/Authentication/ICurrentUser';

export abstract class IBaseController {
  abstract Validator(currentUser: ICurrentUser): UserAuthDTO;
  abstract Forbidden(): any;
}

import { ResultService } from '../ResultService';
import { UserCuponDTO } from 'src/Shoope.Application/DTOs/UserCuponDTO';
import { UserCuponDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/UserCuponDTOValidate/UserCuponDTOValidateCreate';

export abstract class IUserCuponService {
  abstract GetAllCuponByUserId(userId: string): Promise<ResultService<UserCuponDTO[] | null>>;
  abstract Create(
    userCuponDTOValidateCreate: UserCuponDTOValidateCreate | null,
  ): Promise<ResultService<UserCuponDTO | null>>;
  abstract Delete(id: string): Promise<ResultService<UserCuponDTO | null>>;
}

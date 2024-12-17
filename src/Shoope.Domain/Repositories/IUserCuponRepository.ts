import { UserCupon } from '../Entities/UserCupon';

export abstract class IUserCuponRepository {
  abstract GetAllCuponByUserId(userId: string): Promise<UserCupon[] | null>;
  abstract CheckIfExistRegisterById(id: string): Promise<UserCupon | null>;
  abstract Create(entity: UserCupon): Promise<UserCupon | null>;
  abstract Update(entity: UserCupon): Promise<UserCupon | null>;
  abstract Delete(id: string): Promise<UserCupon | null>;
}

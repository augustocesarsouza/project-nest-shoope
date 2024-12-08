import { UserDTO } from 'src/Shoope.Application/DTOs/UserDTO';
import { UserUpdateAllDTO } from 'src/Shoope.Application/DTOs/UserUpdateAllDTO';
import { ResultService } from '../ResultService';
import { UserCreateDTO } from 'src/Shoope.Application/DTOs/UserCreateDTO';

export abstract class IUserManagementService {
  abstract CheckEmailAlreadyExists(phone: string): Promise<ResultService<UserDTO | null>>;
  abstract Create(userDTO: UserCreateDTO | null): Promise<ResultService<UserDTO | null>>;
  abstract UpdateUserAll(
    userUpdateAllDTO: UserUpdateAllDTO,
  ): Promise<ResultService<UserDTO | null>>;
  abstract UpdateUser(userUpdateAllDTO: UserUpdateAllDTO): Promise<ResultService<UserDTO | null>>;
}

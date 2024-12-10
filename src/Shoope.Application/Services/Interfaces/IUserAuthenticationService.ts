import { UserDTO } from 'src/Shoope.Application/DTOs/UserDTO';
import { ResultService } from '../ResultService';
import { UserLoginDTO } from 'src/Shoope.Application/DTOs/UserLoginDTO';
import { UserChangePasswordDTO } from 'src/Shoope.Application/DTOs/UserChangePasswordDTO';
import { UserPasswordUpdateDTO } from 'src/Shoope.Application/DTOs/UserPasswordUpdateDTO';

export abstract class IUserAuthenticationService {
  abstract GetByIdInfoUser(id: string): Promise<ResultService<UserDTO | null>>;
  abstract Login(phone: string, password: string): Promise<ResultService<UserLoginDTO>>;
  abstract ChangePasswordUser(
    userChangePasswordDTO: UserChangePasswordDTO,
  ): Promise<ResultService<UserPasswordUpdateDTO | null>>;
}

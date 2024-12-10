import { UserDTO } from 'src/Shoope.Application/DTOs/UserDTO';
import { ResultService } from '../ResultService';
import { UserLoginDTO } from 'src/Shoope.Application/DTOs/UserLoginDTO';
import { UserChangePasswordDTO } from 'src/Shoope.Application/DTOs/UserChangePasswordDTO';
import { UserPasswordUpdateDTO } from 'src/Shoope.Application/DTOs/UserPasswordUpdateDTO';
import { CodeSendEmailUserDTO } from 'src/Shoope.Application/DTOs/CodeSendEmailUserDTO';
import { UserConfirmCodeEmailDTO } from 'src/Shoope.Application/DTOs/UserConfirmCodeEmailDTO';

export abstract class IUserAuthenticationService {
  abstract GetByIdInfoUser(id: string): Promise<ResultService<UserDTO | null>>;
  abstract VerficEmailAlreadySetUp(
    userConfirmCodeEmailDTO: UserConfirmCodeEmailDTO,
  ): Promise<ResultService<UserDTO | null>>;
  abstract SendCodeEmail(
    codeSendEmailUserDTO: CodeSendEmailUserDTO,
  ): Promise<ResultService<CodeSendEmailUserDTO | null>>;
  abstract Login(phone: string, password: string): Promise<ResultService<UserLoginDTO>>;
  abstract ChangePasswordUser(
    userChangePasswordDTO: UserChangePasswordDTO,
  ): Promise<ResultService<UserPasswordUpdateDTO | null>>;
  abstract VerifyPasswordUser(
    phone: string,
    password: string,
  ): Promise<ResultService<UserLoginDTO | null>>;
}

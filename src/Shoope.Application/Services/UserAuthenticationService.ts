import { IUserRepository } from 'src/Shoope.Domain/Repositories/IUserRepository';
import { IUserMap } from '../Mappings/IMappings/IUserMap';
import { IUserCreateAccountFunction } from './Interfaces/IUserCreateAccountFunction';
import { ResultService } from './ResultService';
import { IUserAuthenticationService } from './Interfaces/IUserAuthenticationService';
import { UserDTO } from '../DTOs/UserDTO';
import { UserLoginDTO } from '../DTOs/UserLoginDTO';
import { Injectable } from '@nestjs/common';
import { ITokenGeneratorUser } from 'src/Shoope.Domain/Authentication/ITokenGeneratorUser';
import { UserChangePasswordDTO } from '../DTOs/UserChangePasswordDTO';
import { UserPasswordUpdateDTO } from '../DTOs/UserPasswordUpdateDTO';

@Injectable()
export class UserAuthenticationService implements IUserAuthenticationService {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _userMap: IUserMap,
    private readonly _userCreateAccountFunction: IUserCreateAccountFunction,
    private readonly _tokenGeneratorUser: ITokenGeneratorUser,
  ) {}

  async GetByIdInfoUser(id: string): Promise<ResultService<UserDTO | null>> {
    try {
      const user = await this._userRepository.GetUserByIdInfoUser(id);

      if (!user) return ResultService.fail<UserDTO | null>('User not found');

      return ResultService.ok<UserDTO>(this._userMap.transformToDTO(user));
    } catch (error) {
      return ResultService.fail<UserDTO | null>(error.message || 'An unexpected error occurred');
    }
  }

  async Login(phone: string, password: string): Promise<ResultService<UserLoginDTO>> {
    try {
      const user = await this._userRepository.GetUserInfoToLogin(phone);

      if (user === null) return ResultService.fail<UserLoginDTO>('Error user info login is null');

      const storedHashedPassword = user.passwordHash;
      const storedSalt = Buffer.from(user.salt, 'base64');
      const enteredPasswordHash = this._userCreateAccountFunction.HashPassword(
        password,
        storedSalt,
      );

      if (storedHashedPassword !== enteredPasswordHash) {
        return ResultService.fail<UserLoginDTO>('Invalid credentials');
      }

      const userReturnToFrontend = new UserDTO();

      userReturnToFrontend.name = user.name;
      userReturnToFrontend.email = user.email;
      userReturnToFrontend.id = user.id;
      userReturnToFrontend.phone = user.phone;
      // userReturnToFrontend.token = ""; tem q fazer token

      const token = this._tokenGeneratorUser.Generator(user, '1h'); // 10s 1m 1h 1d

      if (!token.isSuccess)
        return ResultService.fail<UserLoginDTO>(token.message ?? 'Error generate token');

      userReturnToFrontend.SetToken(token.data.acess_Token);

      const userLoginDTO = new UserLoginDTO();
      userLoginDTO.PasswordIsCorrect = true;
      userLoginDTO.UserDTO = userReturnToFrontend;

      return ResultService.ok<UserLoginDTO>(userLoginDTO);
    } catch (err) {
      return ResultService.fail<UserLoginDTO>(err);
    }
  }

  async ChangePasswordUser(
    userChangePasswordDTO: UserChangePasswordDTO,
  ): Promise<ResultService<UserPasswordUpdateDTO | null>> {
    try {
      const user = await this._userRepository.GetUserByPhoneInfoUpdate(userChangePasswordDTO.phone);

      if (!user) return ResultService.fail<UserPasswordUpdateDTO | null>('User not found');

      const newPassword = userChangePasswordDTO.confirmPassword;
      const saltBytes = this._userCreateAccountFunction.GenerateSalt();
      const base64Salt = Buffer.from(saltBytes).toString('base64');
      const hashedPassword = this._userCreateAccountFunction.HashPassword(newPassword, saltBytes);

      user.SetPasswordHash(hashedPassword);
      user.SetSalt(base64Salt);

      const userUpdate = await this._userRepository.Update(user);

      if (userUpdate == null)
        return ResultService.fail<UserPasswordUpdateDTO>('Erro userUpdate it is null');

      return ResultService.ok<UserPasswordUpdateDTO>(new UserPasswordUpdateDTO(true));
    } catch (error) {
      return ResultService.fail<UserPasswordUpdateDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }
}

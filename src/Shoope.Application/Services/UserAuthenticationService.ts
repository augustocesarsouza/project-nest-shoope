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
import { UserConfirmCodeEmailDTO } from '../DTOs/UserConfirmCodeEmailDTO';
import { CodeRandomDictionary } from '../CodeRandomUser/CodeRandomDictionary';
import { CodeSendEmailUserDTO } from '../DTOs/CodeSendEmailUserDTO';
import { ISendEmailUser } from 'src/Shoope.Infra.Data/SendEmailUser/Interface/ISendEmailUser';

@Injectable()
export class UserAuthenticationService implements IUserAuthenticationService {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _userMap: IUserMap,
    private readonly _userCreateAccountFunction: IUserCreateAccountFunction,
    private readonly _tokenGeneratorUser: ITokenGeneratorUser,
    private readonly codeRandomDictionary: CodeRandomDictionary,
    private readonly _sendEmailUser: ISendEmailUser,
  ) {}

  async VerficEmailAlreadySetUp(
    userConfirmCodeEmailDTO: UserConfirmCodeEmailDTO,
  ): Promise<ResultService<UserDTO | null>> {
    try {
      if (!userConfirmCodeEmailDTO)
        return ResultService.fail<UserDTO | null>('userConfirmCodeEmailDTO is null');

      if (
        this.codeRandomDictionary.contains(
          userConfirmCodeEmailDTO.userId,
          Number(userConfirmCodeEmailDTO.code),
        )
      ) {
        const user = await this._userRepository.GetUserById(userConfirmCodeEmailDTO.userId);

        if (!user) return ResultService.fail<UserDTO | null>('user not found');

        user.email = userConfirmCodeEmailDTO.email;

        const userUpdate = await this._userRepository.Update(user);
        this.codeRandomDictionary.remove(userConfirmCodeEmailDTO.userId);

        return ResultService.ok<UserDTO>(this._userMap.transformToDTO(userUpdate));
      } else {
        return ResultService.fail<UserDTO>('Error Code Not Found');
      }
    } catch (error) {
      return ResultService.fail<UserDTO | null>(error.message || 'An unexpected error occurred');
    }
  }

  async SendCodeEmail(
    codeSendEmailUserDTO: CodeSendEmailUserDTO,
  ): Promise<ResultService<CodeSendEmailUserDTO | null>> {
    try {
      if (!codeSendEmailUserDTO)
        return ResultService.fail<CodeSendEmailUserDTO | null>('codeSendEmailUserDTO is null');

      const user = await this._userRepository.GetUserByName(codeSendEmailUserDTO.name);

      if (!user) ResultService.fail<CodeSendEmailUserDTO | null>('Error User it is null');

      if (user.email != null)
        return ResultService.ok(
          new CodeSendEmailUserDTO({
            code: null,
            codeSendToEmailSuccessfully: false,
            userAlreadyExist: true,
            name: null,
            email: null,
          }),
        );

      user.email = codeSendEmailUserDTO.email;

      const randomCode = this.GerarNumeroAleatorio();
      this.codeRandomDictionary.add(user.id.toString(), randomCode);

      const resultSend = await this._sendEmailUser.SendCodeRandom(user, randomCode);

      if (!resultSend.isSuccess) {
        const codeSend = new CodeSendEmailUserDTO({
          code: resultSend.data,
          codeSendToEmailSuccessfully: false,
          userAlreadyExist: false,
          name: null,
          email: null,
        });
        return ResultService.failWithData<CodeSendEmailUserDTO | null>(codeSend);
      }

      const codeSend = new CodeSendEmailUserDTO({
        code: randomCode.toString(),
        codeSendToEmailSuccessfully: true,
        userAlreadyExist: false,
        name: null,
        email: null,
      });

      return ResultService.ok<CodeSendEmailUserDTO | null>(codeSend);
    } catch (error) {
      return ResultService.fail<CodeSendEmailUserDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

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
      userLoginDTO.passwordIsCorrect = true;
      userLoginDTO.userDTO = userReturnToFrontend;

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

  async VerifyPasswordUser(
    phone: string,
    password: string,
  ): Promise<ResultService<UserLoginDTO | null>> {
    return await this.VerifyPasswordUserIsValid(phone, password);
  }

  private async VerifyPasswordUserIsValid(
    phone: string,
    password: string,
  ): Promise<ResultService<UserLoginDTO | null>> {
    try {
      const user = await this._userRepository.GetUserInfoToLogin(phone);

      if (!user) return ResultService.fail<UserLoginDTO | null>('User not found');

      const storedHashedPassword = user.GetPasswordHash();

      const storedSaltBytes = Buffer.from(user.salt, 'base64');

      const enteredPasswordHash = this._userCreateAccountFunction.HashPassword(
        password,
        storedSaltBytes,
      );

      const userLoginDTO = new UserLoginDTO();

      if (enteredPasswordHash === storedHashedPassword) {
        const userReturnToFrontend = new UserDTO({
          id: user.id,
          name: user.name,
          email: user.email,
          gender: user.gender,
          phone: user.phone,
          cpf: user.cpf,
          birthDate: user.birthDate,
          userImage: user.userImage,
        });

        userLoginDTO.passwordIsCorrect = true;
        userLoginDTO.userDTO = userReturnToFrontend;
        return ResultService.ok<UserLoginDTO>(userLoginDTO);
      } else {
        userLoginDTO.passwordIsCorrect = false;
        userLoginDTO.userDTO = null;
        return ResultService.failWithData<UserLoginDTO>(userLoginDTO);
      }
    } catch (error) {
      return ResultService.fail<UserLoginDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  private GerarNumeroAleatorio(): number {
    const min = 100000;
    const max = 1000000;

    return Math.floor(Math.random() * (max - min)) + min;
  }
}

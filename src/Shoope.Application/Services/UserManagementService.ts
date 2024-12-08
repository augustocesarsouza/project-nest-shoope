import { Injectable } from '@nestjs/common';
import { IUserManagementService } from './Interfaces/IUserManagementService';
import { UserDTO } from '../DTOs/UserDTO';
import { UserUpdateAllDTO } from '../DTOs/UserUpdateAllDTO';
import { ResultService } from './ResultService';
import { IUserRepository } from 'src/Shoope.Domain/Repositories/IUserRepository';
import { UserCreateDTO } from '../DTOs/UserCreateDTO';
import { IUserMap } from '../Mappings/IMappings/IUserMap';
import { v4 as uuidv4 } from 'uuid';
import { IUserCreateAccountFunction } from './Interfaces/IUserCreateAccountFunction';
import { User } from 'src/Shoope.Domain/Entities/User';

@Injectable()
export class UserManagementService implements IUserManagementService {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _userMap: IUserMap,
    private readonly _userCreateAccountFunction: IUserCreateAccountFunction,
  ) {}

  async CheckEmailAlreadyExists(phone: string): Promise<ResultService<UserDTO | null>> {
    try {
      const user = await this._userRepository.GetUserByPhone(phone); // Método que busca o usuário no banco

      if (!user) {
        return ResultService.fail<UserDTO | null>('User not found');
      }

      const userDto = this._userMap.transformToDTO(user);
      return ResultService.ok<UserDTO>(userDto);
    } catch (error) {
      return ResultService.fail<UserDTO | null>(error.message || 'An unexpected error occurred');
    }
  }

  async Create(userCreateDTO: UserCreateDTO | null): Promise<ResultService<UserDTO | null>> {
    try {
      if (userCreateDTO === null) return ResultService.fail<UserDTO | null>('User object is null');

      const password = userCreateDTO.password;

      const saltBytes = this._userCreateAccountFunction.GenerateSalt();
      const base64Salt = Buffer.from(saltBytes).toString('base64');

      const hashedPassword = this._userCreateAccountFunction.HashPassword(password, saltBytes);

      const idUser = uuidv4();
      const randomName = this.generateRandomName(8);

      const userCreate = new User();

      if (userCreateDTO.base64ImageUser !== null) {
        //Colocar aqui o Cloudinary
      } else {
        userCreate.id = idUser;
        userCreate.name = randomName;
        userCreate.email = '';
        userCreate.gender = '';
        userCreate.phone = userCreateDTO.phone;
        userCreate.passwordHash = hashedPassword;
        userCreate.salt = base64Salt;
        userCreate.cpf = '';
        userCreate.birthDate = null;
        userCreate.userImage = null;
      }

      const data = await this._userRepository.Create(userCreate);

      const userReturnToFrontend = new UserDTO();
      userReturnToFrontend.name = data.name;
      userReturnToFrontend.email = data.email;

      return ResultService.ok<UserDTO>(this._userMap.transformToDTO(userReturnToFrontend));

      // const retrievedSaltBytes = Buffer.from(base64Salt, 'base64');
    } catch (error) {
      return ResultService.fail<UserDTO | null>(error.message || 'An unexpected error occurred');
    }
  }

  private generateRandomName(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const prefix = 'e_'; // Prefixo fixo
    let randomString = '';

    // Gerar string aleatória com o comprimento especificado
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomString += chars[randomIndex];
    }

    return prefix + randomString;
  }

  UpdateUserAll(userUpdateAllDTO: UserUpdateAllDTO): Promise<ResultService<UserDTO | null>> {
    throw new Error('Method not implemented.' + userUpdateAllDTO);
  }

  UpdateUser(userUpdateAllDTO: UserUpdateAllDTO): Promise<ResultService<UserDTO | null>> {
    throw new Error('Method not implemented.' + userUpdateAllDTO);
  }
}

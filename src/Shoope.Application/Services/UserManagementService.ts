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
import { IClodinaryUti } from 'src/Shoope.Infra.Data/UtilityExternal/Interface/IClodinaryUti';

@Injectable()
export class UserManagementService implements IUserManagementService {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _userMap: IUserMap,
    private readonly _userCreateAccountFunction: IUserCreateAccountFunction,
    private readonly _clodinaryUti: IClodinaryUti,
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
        const result = await this._clodinaryUti.CreateMedia(
          userCreateDTO.base64ImageUser,
          'img-user',
          320,
          320,
        );

        if (!result.createdSuccessfully)
          return ResultService.fail<UserDTO | null>(
            'Invalid media type. Only images and videos are supported.',
          );

        if (result.imgUrl === null || result.publicId === null)
          return ResultService.fail<UserDTO | null>('Error creating image on Cloudinary');

        userCreate.id = idUser;
        userCreate.name = randomName;
        userCreate.email = '';
        userCreate.gender = '';
        userCreate.phone = userCreateDTO.phone;
        userCreate.passwordHash = hashedPassword;
        userCreate.salt = base64Salt;
        userCreate.cpf = '';
        userCreate.birthDate = null;
        userCreate.userImage = result.imgUrl;
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

  async DeleteUser(userId: string): Promise<ResultService<UserDTO | null>> {
    try {
      const userDelete = await this._userRepository.GetUserByIdForDeleteImg(userId);

      if (userDelete === null) return ResultService.fail<UserDTO | null>('User not found');

      const userImage = userDelete.userImage;
      const match = userImage.match(/upload\/(?:v\d+\/)?(.+)/);
      const extractedPath = match ? match[1] : null;
      const index = extractedPath.lastIndexOf('.');

      if (!extractedPath) return ResultService.fail<UserDTO | null>('Image path not found');

      const pathWithoutExtension = index !== -1 ? extractedPath.slice(0, index) : extractedPath;

      const deleteCloudinary = await this._clodinaryUti.DeleteMediaCloudinary(
        pathWithoutExtension,
        'image',
      );

      if (!deleteCloudinary.deleteSuccessfully) {
        return ResultService.fail<UserDTO | null>('Failed to delete media from Cloudinary');
      }

      const userDeleteSuccessfully = await this._userRepository.Delete(userDelete.id);

      return ResultService.ok<UserDTO>(this._userMap.transformToDTO(userDeleteSuccessfully));
    } catch (error) {
      return ResultService.fail<UserDTO | null>(error.message || 'An unexpected error occurred');
    }
  }
}

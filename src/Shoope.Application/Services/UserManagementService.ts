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
import { CloudinaryResult } from 'src/Shoope.Infra.Data/ReturnDTO/CloudinaryResult';
import { UserUpdateFillDTO } from '../DTOs/UserUpdateFillDTO';

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
      const user = await this._userRepository.GetUserByPhone(phone);

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

  async UpdateUserAll(userUpdateAllDTO: UserUpdateAllDTO): Promise<ResultService<UserDTO | null>> {
    try {
      if (userUpdateAllDTO === null)
        return ResultService.fail<UserDTO>('error DTO Informed Is null');

      const userToUpdate = await this._userRepository.GetUserById(userUpdateAllDTO.id);

      if (userToUpdate === null) return ResultService.fail<UserDTO>('Error UserToUpdate Is null');

      if (userUpdateAllDTO.base64StringImage !== null) {
        const deleteFound = await this.WhichFoundDeleteCloudinary(userToUpdate.userImage, 'image');

        if (!deleteFound.isSuccess) return ResultService.fail<UserDTO | null>(deleteFound.message);

        const deleteCloudinary = deleteFound.data as CloudinaryResult;

        if (!deleteCloudinary.deleteSuccessfully)
          return ResultService.fail<UserDTO | null>('Failed to delete media from Cloudinary');

        const result = await this._clodinaryUti.CreateMedia(
          userUpdateAllDTO.base64StringImage,
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

        userToUpdate.name = userUpdateAllDTO.name;
        userToUpdate.email = userUpdateAllDTO.email;
        userToUpdate.gender = userUpdateAllDTO.gender;
        userToUpdate.phone = userUpdateAllDTO.phone;
        userToUpdate.userImage = result.imgUrl;

        const updateUser = await this._userRepository.Update(userToUpdate);

        if (updateUser === null)
          return ResultService.fail<UserDTO | null>('error updateUser is null');

        return ResultService.ok<UserDTO>(this._userMap.transformToDTO(updateUser));
      } else {
        userToUpdate.name = userUpdateAllDTO.name;
        userToUpdate.email = userUpdateAllDTO.email;
        userToUpdate.gender = userUpdateAllDTO.gender;
        userToUpdate.phone = userUpdateAllDTO.phone;
        userToUpdate.userImage = userToUpdate.userImage;
      }
    } catch (error) {
      return ResultService.fail(error.message || 'An unexpected error occurred');
    }
  }

  async UpdateUser(userUpdateFillDTO: UserUpdateFillDTO): Promise<ResultService<UserDTO | null>> {
    try {
      if (userUpdateFillDTO === null)
        return ResultService.fail<UserDTO | null>('error dto is null');

      const { cpf, birthDate, userId } = userUpdateFillDTO;

      if (userUpdateFillDTO.cpf.length > 11 || userUpdateFillDTO.cpf.length < 11)
        return ResultService.fail<UserDTO | null>('Cpf Is not a Cpf Valid');

      const userToUpdate = await this._userRepository.GetUserById(userId);

      if (userToUpdate === null) return ResultService.fail<UserDTO | null>('User not found');

      const dateParts = birthDate.split('/');
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Meses no JS são baseados em 0
      const year = parseInt(dateParts[2], 10);

      const birthDateObject = new Date(year, month, day);

      if (isNaN(birthDateObject.getTime())) {
        return ResultService.fail<UserDTO | null>('BirthDate is invalid');
      }

      userToUpdate.cpf = cpf;
      userToUpdate.birthDate = birthDateObject;

      const updatedUser = await this._userRepository.Update(userToUpdate);
      if (!updatedUser) {
        return ResultService.fail<UserDTO | null>('Error: User update failed');
      }

      return ResultService.ok<UserDTO>(this._userMap.transformToDTO(updatedUser));
    } catch (error) {
      return ResultService.fail<UserDTO | null>(error.message || 'An unexpected error occurred');
    }
  }

  async DeleteUser(userId: string): Promise<ResultService<UserDTO | null>> {
    try {
      const userDelete = await this._userRepository.GetUserByIdForDeleteImg(userId);

      if (userDelete === null) return ResultService.fail<UserDTO | null>('User not found');

      const deleteFound = await this.WhichFoundDeleteCloudinary(userDelete.userImage, 'image');

      if (!deleteFound.isSuccess) return ResultService.fail<UserDTO | null>(deleteFound.message);

      const deleteCloudinary = deleteFound.data as CloudinaryResult;

      if (!deleteCloudinary.deleteSuccessfully) {
        return ResultService.fail<UserDTO | null>('Failed to delete media from Cloudinary');
      }

      const userDeleteSuccessfully = await this._userRepository.Delete(userDelete.id);

      return ResultService.ok<UserDTO>(this._userMap.transformToDTO(userDeleteSuccessfully));
    } catch (error) {
      return ResultService.fail<UserDTO | null>(error.message || 'An unexpected error occurred');
    }
  }

  private WhichFoundDeleteCloudinary = async (
    userImage: string,
    resourceType: string,
  ): Promise<ResultService<UserDTO> | ResultService<CloudinaryResult>> => {
    const match = userImage.match(/upload\/(?:v\d+\/)?(.+)/);
    const extractedPath = match ? match[1] : null;
    const index = extractedPath.lastIndexOf('.');

    if (!extractedPath) return ResultService.fail<UserDTO | null>('Image path not found');

    const pathWithoutExtension = index !== -1 ? extractedPath.slice(0, index) : extractedPath;

    const deleteCloudinary = await this._clodinaryUti.DeleteMediaCloudinary(
      pathWithoutExtension,
      resourceType,
    );

    return ResultService.ok(deleteCloudinary);
  };
}

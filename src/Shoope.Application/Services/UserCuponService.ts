import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ResultService } from './ResultService';
import { IUserCuponService } from './Interfaces/IUserCuponService';
import { UserCuponDTO } from '../DTOs/UserCuponDTO';
import { IUserCuponRepository } from 'src/Shoope.Domain/Repositories/IUserCuponRepository';
import { IUserCuponMap } from '../Mappings/IMappings/IUserCuponMap';
import { UserCuponDTOValidateCreate } from '../DTOs/Validations/UserCuponDTOValidate/UserCuponDTOValidateCreate';
import { UserCupon } from 'src/Shoope.Domain/Entities/UserCupon';

@Injectable()
export class UserCuponService implements IUserCuponService {
  constructor(
    private readonly _userCuponRepository: IUserCuponRepository,
    private readonly _userCuponMap: IUserCuponMap,
  ) {}

  async GetAllCuponByUserId(userId: string): Promise<ResultService<UserCuponDTO[] | null>> {
    try {
      const UserCuponList = await this._userCuponRepository.GetAllCuponByUserId(userId);

      if (!UserCuponList) {
        return ResultService.fail<UserCuponDTO[] | null>('userCuponList not found');
      }

      return ResultService.ok<UserCuponDTO[]>(this._userCuponMap.transformToDTOList(UserCuponList));
    } catch (error) {
      return ResultService.fail<UserCuponDTO[] | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Create(
    userCuponDTOValidateCreate: UserCuponDTOValidateCreate | null,
  ): Promise<ResultService<UserCuponDTO | null>> {
    try {
      if (userCuponDTOValidateCreate === null)
        ResultService.fail<UserCuponDTO | null>('DTO is null');

      const id = uuidv4();
      const userCupon = new UserCupon(
        id,
        userCuponDTOValidateCreate.cuponId,
        null,
        userCuponDTOValidateCreate.userId,
        null,
      );

      const userCuponCreated = await this._userCuponRepository.Create(userCupon);

      return ResultService.ok<UserCuponDTO>(this._userCuponMap.transformToDTO(userCuponCreated));
    } catch (error) {
      return ResultService.fail<UserCuponDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  Delete(id: string): Promise<ResultService<UserCuponDTO | null>> {
    throw new Error('Method not implemented.' + id);
  }
}

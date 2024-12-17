import { Injectable } from '@nestjs/common';
import { IPromotionUserService } from './Interfaces/IPromotionUserService';
import { PromotionUserDTO } from '../DTOs/PromotionUserDTO';
import { PromotionUserDTOValidateCreate } from '../DTOs/Validations/PromotionUserDTOValidate/PromotionUserDTOValidateCreate';
import { ResultService } from './ResultService';
import { IPromotionUserMap } from '../Mappings/IMappings/IPromotionUserMap';
import { IPromotionUserRepository } from 'src/Shoope.Domain/Repositories/IPromotionUserRepository';
import { v4 as uuidv4 } from 'uuid';
import { PromotionUser } from 'src/Shoope.Domain/Entities/PromotionUser';

@Injectable()
export class PromotionUserService implements IPromotionUserService {
  constructor(
    private readonly _promotionUserRepository: IPromotionUserRepository,
    private readonly _promotionUserMap: IPromotionUserMap,
  ) {}

  async GetByUserIdAll(userId: string): Promise<ResultService<PromotionUserDTO[] | null>> {
    try {
      const promotionUser = await this._promotionUserRepository.GetByUserIdAll(userId);

      if (!promotionUser) {
        return ResultService.fail<PromotionUserDTO[] | null>('Promotion not found');
      }

      return ResultService.ok<PromotionUserDTO[]>(
        this._promotionUserMap.transformToDTOList(promotionUser),
      );
    } catch (error) {
      return ResultService.fail<PromotionUserDTO[] | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Create(
    promotionUserDTOValidateCreate: PromotionUserDTOValidateCreate | null,
  ): Promise<ResultService<PromotionUserDTO | null>> {
    try {
      if (promotionUserDTOValidateCreate === null)
        ResultService.fail<PromotionUserDTO | null>('DTO is null');

      const id = uuidv4();
      const promotionUser = new PromotionUser(
        id,
        promotionUserDTOValidateCreate.promotionId,
        null,
        promotionUserDTOValidateCreate.userId,
        null,
      );

      const productSellerCreated = await this._promotionUserRepository.Create(promotionUser);

      return ResultService.ok<PromotionUserDTO>(
        this._promotionUserMap.transformToDTO(productSellerCreated),
      );
    } catch (error) {
      return ResultService.fail<PromotionUserDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Delete(promotionId: string): Promise<ResultService<string | null>> {
    try {
      const promotionUserDeleteList =
        await this._promotionUserRepository.GetPromotionUserByPromotionId(promotionId);

      if (promotionUserDeleteList === null)
        return ResultService.fail<string | null>('PromotionUser not found');

      for (let i = 0; i < promotionUserDeleteList.length; i++) {
        const element = promotionUserDeleteList[i];
        await this._promotionUserRepository.Delete(element.id);
      }

      return ResultService.ok<string>('delete Successfully');
    } catch (error) {
      return ResultService.fail<string | null>(error.message || 'An unexpected error occurred');
    }
  }
}

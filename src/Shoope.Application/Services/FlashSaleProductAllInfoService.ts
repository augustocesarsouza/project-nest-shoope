import { Injectable } from '@nestjs/common';
import { IFlashSaleProductAllInfoService } from './Interfaces/IFlashSaleProductAllInfoService';
import { IFlashSaleProductAllInfoMap } from '../Mappings/IMappings/IFlashSaleProductAllInfoMap';
import { IFlashSaleProductAllInfoRepository } from 'src/Shoope.Domain/Repositories/IFlashSaleProductAllInfo';
import { ResultService } from './ResultService';
import { FlashSaleProductAllInfoDTO } from '../DTOs/FlashSaleProductAllInfoDTO';
import { FlashSaleProductAllInfoDTOValidateCreate } from '../DTOs/Validations/FlashSaleProductAllInfoDTOValidate/FlashSaleProductAllInfoDTOValidateCreate';
import { v4 as uuidv4 } from 'uuid';
import { FlashSaleProductAllInfo } from 'src/Shoope.Domain/Entities/FlashSaleProductAllInfo';

@Injectable()
export class FlashSaleProductAllInfoService implements IFlashSaleProductAllInfoService {
  constructor(
    private readonly _flashSaleProductAllInfoRepository: IFlashSaleProductAllInfoRepository,
    private readonly _flashSaleProductAllInfoMap: IFlashSaleProductAllInfoMap,
  ) {}

  async GetFlashSaleProductByProductFlashSaleId(
    productFlashSaleId: string,
  ): Promise<ResultService<FlashSaleProductAllInfoDTO | null>> {
    try {
      const flashSaleProductAllInfo =
        await this._flashSaleProductAllInfoRepository.GetFlashSaleProductByProductFlashSaleId(
          productFlashSaleId,
        );

      if (!flashSaleProductAllInfo) {
        return ResultService.fail<FlashSaleProductAllInfoDTO | null>('flashSaleProduct not found');
      }

      return ResultService.ok<FlashSaleProductAllInfoDTO>(
        this._flashSaleProductAllInfoMap.transformToDTO(flashSaleProductAllInfo),
      );
    } catch (error) {
      return ResultService.fail<FlashSaleProductAllInfoDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Create(
    flashSaleProductAllInfoDTOValidateCreate: FlashSaleProductAllInfoDTOValidateCreate | null,
  ): Promise<ResultService<FlashSaleProductAllInfoDTO | null>> {
    try {
      if (flashSaleProductAllInfoDTOValidateCreate === null)
        ResultService.fail<FlashSaleProductAllInfoDTO | null>('DTO is null');

      const id = uuidv4();

      const flashSaleProductAllInfo = new FlashSaleProductAllInfo(
        id,
        flashSaleProductAllInfoDTOValidateCreate.productsOfferFlashId,
        null,
        flashSaleProductAllInfoDTOValidateCreate.productReviewsRate,
        flashSaleProductAllInfoDTOValidateCreate.quantitySold,
        flashSaleProductAllInfoDTOValidateCreate.favoriteQuantity,
        flashSaleProductAllInfoDTOValidateCreate.quantityAvaliation,
        flashSaleProductAllInfoDTOValidateCreate.coins,
        flashSaleProductAllInfoDTOValidateCreate.creditCard,
        flashSaleProductAllInfoDTOValidateCreate.voltage,
        flashSaleProductAllInfoDTOValidateCreate.quantityPiece,
        flashSaleProductAllInfoDTOValidateCreate.size,
        flashSaleProductAllInfoDTOValidateCreate.productHaveInsurance,
      );

      const flashSaleProductAllInfoCreate =
        await this._flashSaleProductAllInfoRepository.Create(flashSaleProductAllInfo);

      return ResultService.ok<FlashSaleProductAllInfoDTO>(
        this._flashSaleProductAllInfoMap.transformToDTO(flashSaleProductAllInfoCreate),
      );
    } catch (error) {
      return ResultService.fail<FlashSaleProductAllInfoDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Delete(
    flashSaleProductAllInfoId: string,
  ): Promise<ResultService<FlashSaleProductAllInfoDTO | null>> {
    try {
      const flashSaleProductAllInfoDelete =
        await this._flashSaleProductAllInfoRepository.GetFlashSaleProductAllInfoById(
          flashSaleProductAllInfoId,
        );

      if (flashSaleProductAllInfoDelete === null)
        ResultService.fail<FlashSaleProductAllInfoDTO | null>('flashSaleProductAllInfo not found');

      const flashSaleProductAllInfoDeleteDB =
        await this._flashSaleProductAllInfoRepository.Delete(flashSaleProductAllInfoId);

      return ResultService.ok<FlashSaleProductAllInfoDTO>(
        this._flashSaleProductAllInfoMap.transformToDTO(flashSaleProductAllInfoDeleteDB),
      );
    } catch (error) {
      return ResultService.fail<FlashSaleProductAllInfoDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }
}

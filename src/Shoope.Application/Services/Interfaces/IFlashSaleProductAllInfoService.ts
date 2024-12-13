import { FlashSaleProductAllInfoDTO } from 'src/Shoope.Application/DTOs/FlashSaleProductAllInfoDTO';
import { ResultService } from '../ResultService';
import { FlashSaleProductAllInfoDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/FlashSaleProductAllInfoDTOValidate/FlashSaleProductAllInfoDTOValidateCreate';

export abstract class IFlashSaleProductAllInfoService {
  abstract GetFlashSaleProductByProductFlashSaleId(
    productFlashSaleId: string,
  ): Promise<ResultService<FlashSaleProductAllInfoDTO | null>>;
  abstract Create(
    flashSaleProductAllInfoDTOValidateCreate: FlashSaleProductAllInfoDTOValidateCreate | null,
  ): Promise<ResultService<FlashSaleProductAllInfoDTO | null>>;
  abstract Delete(
    flashSaleProductAllInfoId: string,
  ): Promise<ResultService<FlashSaleProductAllInfoDTO | null>>;
}

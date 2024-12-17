import { PromotionDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/PromotionDTOValidate/PromotionDTOValidateCreate';
import { ResultService } from '../ResultService';
import { PromotionDTO } from 'src/Shoope.Application/DTOs/PromotionDTO';

export abstract class IPromotionService {
  abstract GetById(promotionId: string): Promise<ResultService<PromotionDTO | null>>;
  abstract Create(
    promotionDTOValidateCreate: PromotionDTOValidateCreate | null,
  ): Promise<ResultService<PromotionDTO | null>>;
  abstract DeletePromotion(promotionId: string): Promise<ResultService<PromotionDTO | null>>;
  abstract Delete(id: string): Promise<ResultService<PromotionDTO | null>>;
}

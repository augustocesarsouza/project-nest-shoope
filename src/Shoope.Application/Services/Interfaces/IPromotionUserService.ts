import { PromotionUserDTO } from 'src/Shoope.Application/DTOs/PromotionUserDTO';
import { ResultService } from '../ResultService';
import { PromotionUserDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/PromotionUserDTOValidate/PromotionUserDTOValidateCreate';

export abstract class IPromotionUserService {
  abstract GetByUserIdAll(userId: string): Promise<ResultService<PromotionUserDTO[] | null>>;
  abstract Create(
    promotionUserDTOValidateCreate: PromotionUserDTOValidateCreate | null,
  ): Promise<ResultService<PromotionUserDTO | null>>;
  abstract Delete(promotionId: string): Promise<ResultService<string | null>>;
}

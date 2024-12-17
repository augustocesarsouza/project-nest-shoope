import { PromotionUser } from '../Entities/PromotionUser';

export abstract class IPromotionUserRepository {
  abstract GetById(userId: string): Promise<PromotionUser | null>;
  abstract GetByUserIdAll(userId: string): Promise<PromotionUser[] | null>;
  abstract GetPromotionUserByPromotionId(promotionId: string): Promise<PromotionUser[] | null>;
  abstract CheckIfExistRegisterById(id: string): Promise<PromotionUser | null>;
  abstract Create(entity: PromotionUser): Promise<PromotionUser | null>;
  abstract Update(entity: PromotionUser): Promise<PromotionUser | null>;
  abstract Delete(id: string): Promise<PromotionUser | null>;
}

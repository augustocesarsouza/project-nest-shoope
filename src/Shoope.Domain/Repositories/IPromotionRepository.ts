import { Promotion } from '../Entities/Promotion';

export abstract class IPromotionRepository {
  abstract GetById(promotionId: string): Promise<Promotion | null>;
  abstract CheckIfExistRegisterById(id: string): Promise<Promotion | null>;
  abstract Create(entity: Promotion): Promise<Promotion | null>;
  abstract Update(entity: Promotion): Promise<Promotion | null>;
  abstract Delete(id: string): Promise<Promotion | null>;
}

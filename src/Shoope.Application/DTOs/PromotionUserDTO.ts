import { PromotionDTO } from './PromotionDTO';
import { UserDTO } from './UserDTO';

export class PromotionUserDTO {
  id: string;

  promotionId?: string;
  promotionDTO?: PromotionDTO;

  userId?: string;
  userDTO?: UserDTO;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    promotionId?: string,
    promotionDTO?: PromotionDTO,

    userId?: string,
    userDTO?: UserDTO,

    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.promotionId = promotionId;
    this.promotionDTO = promotionDTO;
    this.userId = userId;
    this.userDTO = userDTO;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

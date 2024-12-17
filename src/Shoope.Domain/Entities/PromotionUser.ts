import { Promotion } from './Promotion';
import { User } from './User';

export class PromotionUser {
  id: string;

  promotionId?: string;
  promotion?: Promotion;

  userId?: string;
  user?: User;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    promotionId?: string,
    promotion?: Promotion,

    userId?: string,
    user?: User,

    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.promotionId = promotionId;
    this.promotion = promotion;
    this.userId = userId;
    this.user = user;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

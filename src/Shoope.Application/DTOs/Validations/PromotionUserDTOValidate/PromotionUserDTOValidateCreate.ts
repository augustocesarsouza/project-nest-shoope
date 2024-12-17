import { IsNotEmpty } from 'class-validator';

export class PromotionUserDTOValidateCreate {
  @IsNotEmpty()
  promotionId?: string;
  @IsNotEmpty()
  userId?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

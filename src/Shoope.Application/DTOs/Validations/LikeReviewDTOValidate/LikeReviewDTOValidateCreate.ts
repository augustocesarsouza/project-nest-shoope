import { IsNotEmpty } from 'class-validator';

export class LikeReviewDTOValidateCreate {
  id: string;
  @IsNotEmpty()
  productFlashSaleReviewsId?: string;
  @IsNotEmpty()
  userId?: string;
  alreadyExistLikeReview?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

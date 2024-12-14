import { IsNotEmpty } from 'class-validator';

export class LikeReviewDTOValidateDelete {
  id: string;
  @IsNotEmpty()
  productFlashSaleReviewsId?: string;
  @IsNotEmpty()
  userId?: string;
  alreadyExistLikeReview?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

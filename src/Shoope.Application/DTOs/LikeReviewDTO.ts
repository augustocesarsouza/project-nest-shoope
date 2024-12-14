export class LikeReviewDTO {
  id: string;
  productFlashSaleReviewsId?: string;
  userId?: string;
  alreadyExistLikeReview?: boolean;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id?: string,
    productFlashSaleReviewsId?: string,
    userId?: string,
    createdAt?: Date,
    updatedAt?: Date,
    alreadyExistLikeReview?: boolean,
  ) {
    this.id = id;
    this.productFlashSaleReviewsId = productFlashSaleReviewsId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.alreadyExistLikeReview = alreadyExistLikeReview;
  }
}

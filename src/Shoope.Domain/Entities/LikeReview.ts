export class LikeReview {
  id: string;
  productFlashSaleReviewsId?: string;
  userId?: string;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id?: string,
    productFlashSaleReviewsId?: string,
    userId?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.productFlashSaleReviewsId = productFlashSaleReviewsId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

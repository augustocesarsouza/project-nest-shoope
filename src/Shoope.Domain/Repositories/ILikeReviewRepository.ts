import { LikeReview } from '../Entities/LikeReview';

export abstract class ILikeReviewRepository {
  abstract GetByProductFlashSaleReviewsId(
    productFlashSaleReviewsId: string,
  ): Promise<LikeReview[] | null>;
  abstract GetByUserId(userId: string): Promise<LikeReview | null>;
  abstract AlreadyExistLike(
    userId: string,
    productFlashSaleReviewsId: string,
  ): Promise<LikeReview | null>;
  abstract Create(entity: LikeReview): Promise<LikeReview | null>;
  abstract Update(entity: LikeReview): Promise<LikeReview | null>;
  abstract Delete(id: string): Promise<LikeReview | null>;
}

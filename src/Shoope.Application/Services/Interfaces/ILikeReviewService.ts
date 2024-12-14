import { LikeReviewDTO } from 'src/Shoope.Application/DTOs/LikeReviewDTO';
import { ResultService } from '../ResultService';
import { LikeReviewDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/LikeReviewDTOValidate/LikeReviewDTOValidateCreate';
import { LikeReviewDTOValidateDelete } from 'src/Shoope.Application/DTOs/Validations/LikeReviewDTOValidate/LikeReviewDTOValidateDelete';

export abstract class ILikeReviewService {
  abstract GetByProductFlashSaleReviewsId(
    productFlashSaleReviewsId: string,
  ): Promise<ResultService<LikeReviewDTO[] | null>>;
  abstract Create(
    likeReviewDTOValidateCreate: LikeReviewDTOValidateCreate | null | null,
  ): Promise<ResultService<LikeReviewDTO | null>>;
  abstract Delete(
    likeReviewDTOValidateDelete: LikeReviewDTOValidateDelete | null,
  ): Promise<ResultService<LikeReviewDTO | null>>;
}

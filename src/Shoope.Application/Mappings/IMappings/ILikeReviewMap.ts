import { LikeReviewDTO } from 'src/Shoope.Application/DTOs/LikeReviewDTO';
import { LikeReview } from 'src/Shoope.Domain/Entities/LikeReview';

export abstract class ILikeReviewMap {
  abstract transformToDTO(entity: LikeReview): LikeReviewDTO;
  abstract transformToEntity(entityDTO: LikeReviewDTO): LikeReview;
  abstract transformToDTOList(entityList: LikeReview[]): LikeReviewDTO[];
  abstract transformToEntityList(entityDTO: LikeReviewDTO[]): LikeReview[];
}

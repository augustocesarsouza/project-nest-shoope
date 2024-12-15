import { ProductFlashSaleReviewsDTO } from 'src/Shoope.Application/DTOs/ProductFlashSaleReviewsDTO';
import { ProductFlashSaleReviews } from 'src/Shoope.Domain/Entities/ProductFlashSaleReviews';

export abstract class IProductFlashSaleReviewsMap {
  abstract transformToDTO(entity: ProductFlashSaleReviews): ProductFlashSaleReviewsDTO;
  abstract transformToEntity(entityDTO: ProductFlashSaleReviewsDTO): ProductFlashSaleReviews;
  abstract transformToDTOList(entityList: ProductFlashSaleReviews[]): ProductFlashSaleReviewsDTO[];
  abstract transformToEntityList(
    entityDTO: ProductFlashSaleReviewsDTO[],
  ): ProductFlashSaleReviews[];
}

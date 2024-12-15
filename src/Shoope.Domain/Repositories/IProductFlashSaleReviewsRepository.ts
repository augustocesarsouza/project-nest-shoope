import { ProductFlashSaleReviews } from '../Entities/ProductFlashSaleReviews';

export abstract class IProductFlashSaleReviewsRepository {
  abstract GetByProductFlashSaleId(
    productFlashSaleReviewsId: string,
  ): Promise<ProductFlashSaleReviews | null>;
  abstract GetAllProductFlashSaleReviewsByProductFlashSaleId(
    productFlashSaleId: string,
  ): Promise<ProductFlashSaleReviews[] | null>;
  abstract CheckWheterItExistProductFlashSaleReviews(
    id: string,
  ): Promise<ProductFlashSaleReviews | null>;
  abstract Create(entity: ProductFlashSaleReviews): Promise<ProductFlashSaleReviews | null>;
  abstract Update(entity: ProductFlashSaleReviews): Promise<ProductFlashSaleReviews | null>;
  abstract Delete(id: string): Promise<ProductFlashSaleReviews | null>;
}

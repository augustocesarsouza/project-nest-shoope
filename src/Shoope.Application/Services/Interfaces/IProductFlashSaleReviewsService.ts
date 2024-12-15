import { ProductFlashSaleReviewsDTO } from 'src/Shoope.Application/DTOs/ProductFlashSaleReviewsDTO';
import { ResultService } from '../ResultService';
import { ProductFlashSaleReviewsDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/ProductFlashSaleReviewsDTOValidate/ProductFlashSaleReviewsDTOValidateCreate';

export abstract class IProductFlashSaleReviewsService {
  abstract GetAllProductFlashSaleReviewsByProductFlashSaleId(
    productFlashSaleId: string,
  ): Promise<ResultService<ProductFlashSaleReviewsDTO[] | null>>;
  abstract Create(
    productFlashSaleReviewsDTOValidateCreate: ProductFlashSaleReviewsDTOValidateCreate | null,
  ): Promise<ResultService<ProductFlashSaleReviewsDTO | null>>;
  abstract Delete(id: string): Promise<ResultService<ProductFlashSaleReviewsDTO | null>>;
}

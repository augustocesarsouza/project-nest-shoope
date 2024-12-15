import { ProductDetailDTO } from 'src/Shoope.Application/DTOs/ProductDetailDTO';
import { ResultService } from '../ResultService';
import { ProductDetailDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/ProductDetailDTOValidate/ProductDetailDTOValidateCreate';

export abstract class IProductDetailService {
  abstract GetProductDetailByProductId(
    productId: string,
  ): Promise<ResultService<ProductDetailDTO | null>>;
  abstract Create(
    productDetailDTOValidateCreate: ProductDetailDTOValidateCreate | null,
  ): Promise<ResultService<ProductDetailDTO | null>>;
  abstract Delete(id: string): Promise<ResultService<ProductDetailDTO | null>>;
}

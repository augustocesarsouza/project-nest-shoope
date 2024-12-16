import { ProductOptionImageDTO } from 'src/Shoope.Application/DTOs/ProductOptionImageDTO';
import { ResultService } from '../ResultService';
import { ProductOptionImageDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/ProductOptionImageDTOValidate/ProductOptionImageDTOValidateCreate';

export abstract class IProductOptionImageService {
  abstract GetByListFlashSaleProductImageAllId(
    productsOfferFlashId: string,
  ): Promise<ResultService<ProductOptionImageDTO[] | null>>;
  abstract Create(
    productOptionImageDTOValidateCreate: ProductOptionImageDTOValidateCreate | null,
  ): Promise<ResultService<ProductOptionImageDTO | null>>;
  abstract DeleteAllByProductsOfferFlashId(
    productsOfferFlashId: string,
  ): Promise<ResultService<string | null>>;
}

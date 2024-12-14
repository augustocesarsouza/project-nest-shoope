import { ProductDescriptionDTO } from 'src/Shoope.Application/DTOs/ProductDescriptionDTO';
import { ResultService } from '../ResultService';
import { ProductDescriptionDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/ProductDescriptionDTOValidate/ProductDescriptionDTOValidateCreate';

export abstract class IProductDescriptionService {
  abstract GetProductDescriptionByProductId(
    productId: string,
  ): Promise<ResultService<ProductDescriptionDTO | null>>;
  abstract Create(
    productDescriptionDTOValidateCreate: ProductDescriptionDTOValidateCreate | null,
  ): Promise<ResultService<ProductDescriptionDTO | null>>;
  abstract Delete(id: string): Promise<ResultService<ProductDescriptionDTO | null>>;
}

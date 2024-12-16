import { ProductHighlightDTO } from 'src/Shoope.Application/DTOs/ProductHighlightDTO';
import { ResultService } from '../ResultService';
import { ProductHighlightDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/ProductHighlightDTOValidate/ProductHighlightDTOValidateCreate';

export abstract class IProductHighlightService {
  abstract GetProductHighlightById(
    productHighlightId: string,
  ): Promise<ResultService<ProductHighlightDTO | null>>;
  abstract GetAllProductHighlights(): Promise<ResultService<ProductHighlightDTO[] | null>>;
  abstract Create(
    productHighlightDTOValidateCreate: ProductHighlightDTOValidateCreate | null,
  ): Promise<ResultService<ProductHighlightDTO | null>>;
  abstract Delete(id: string): Promise<ResultService<ProductHighlightDTO | null>>;
}

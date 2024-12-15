import { ProductDiscoveriesOfDayDTO } from 'src/Shoope.Application/DTOs/ProductDiscoveriesOfDayDTO';
import { ResultService } from '../ResultService';
import { ProductDiscoveriesOfDayDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/ProductDiscoveriesOfDayDTOValidate/ProductDiscoveriesOfDayDTOValidateCreate';

export abstract class IProductDiscoveriesOfDayService {
  abstract GetProductDiscoveriesOfDayById(
    productDiscoveriesOfDayId: string,
  ): Promise<ResultService<ProductDiscoveriesOfDayDTO | null>>;
  abstract GetAllProductDiscoveriesOfDays(): Promise<
    ResultService<ProductDiscoveriesOfDayDTO[] | null>
  >;
  abstract Create(
    productDiscoveriesOfDayDTOValidateCreate: ProductDiscoveriesOfDayDTOValidateCreate | null,
  ): Promise<ResultService<ProductDiscoveriesOfDayDTO | null>>;
  abstract Delete(id: string): Promise<ResultService<ProductDiscoveriesOfDayDTO | null>>;
}

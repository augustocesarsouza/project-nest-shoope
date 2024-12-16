import { ProductSellerDTO } from 'src/Shoope.Application/DTOs/ProductSellerDTO';
import { ResultService } from '../ResultService';
import { ProductSellerDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/ProductSellerDTOValidate/ProductSellerDTOValidateCreate';
import { UserSellerProduct } from 'src/Shoope.Domain/Entities/UserSellerProduct';

export abstract class IProductSellerService {
  abstract GetById(productId: string): Promise<ResultService<ProductSellerDTO | null>>;
  abstract Create(
    productSellerDTOValidateCreate: ProductSellerDTOValidateCreate | null,
  ): Promise<ResultService<ProductSellerDTO | null>>;
  abstract Delete(id: string): Promise<ResultService<ProductSellerDTO | null>>;
  abstract DeleteByUserSellerProductId(
    userSellerProduct: UserSellerProduct,
  ): Promise<ResultService<ProductSellerDTO | null>>;
}

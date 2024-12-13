import { ProductsOfferFlashDTO } from 'src/Shoope.Application/DTOs/ProductsOfferFlashDTO';
import { ResultService } from '../ResultService';
import { ProductsOfferFlashDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/ProductsOfferFlashDTOValidate/ProductsOfferFlashDTOValidateCreate';

export abstract class IProductsOfferFlashService {
  abstract GetAllProduct(): Promise<ResultService<ProductsOfferFlashDTO[] | null>>;
  abstract GetAllByTagProduct(
    hourFlashOffer: string,
    tagProduct: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<ResultService<ProductsOfferFlashDTO[] | null>>;
  abstract Create(
    productsOfferFlashDTOValidateCreate: ProductsOfferFlashDTOValidateCreate | null,
  ): Promise<ResultService<ProductsOfferFlashDTO | null>>;
  abstract Delete(
    productsOfferFlashId: string,
  ): Promise<ResultService<ProductsOfferFlashDTO | null>>;
}

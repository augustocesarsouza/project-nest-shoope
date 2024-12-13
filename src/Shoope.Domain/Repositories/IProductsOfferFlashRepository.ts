import { ProductsOfferFlash } from '../Entities/ProductsOfferFlash';

export abstract class IProductsOfferFlashRepository {
  abstract GetByProductsOfferFlashId(
    productsOfferFlashId: string,
  ): Promise<ProductsOfferFlash | null>;
  abstract GetAllProduct(): Promise<ProductsOfferFlash[] | null>;
  abstract GetAllByTagProduct(
    hourFlashOffer: string,
    tagProduct: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<ProductsOfferFlash[] | null>;
  abstract Create(entity: ProductsOfferFlash): Promise<ProductsOfferFlash | null>;
  abstract Update(entity: ProductsOfferFlash): Promise<ProductsOfferFlash | null>;
  abstract Delete(id: string): Promise<ProductsOfferFlash | null>;
}

import { ProductOptionImage } from '../Entities/ProductOptionImage';

export abstract class IProductOptionImageRepository {
  abstract GetByListFlashSaleProductImageAllId(
    productsOfferFlashId: string,
  ): Promise<ProductOptionImage[] | null>;
  abstract GetAllByProductsOfferFlashId(
    productsOfferFlashId: string,
  ): Promise<ProductOptionImage[] | null>;
  abstract Create(entity: ProductOptionImage): Promise<ProductOptionImage | null>;
  abstract Update(entity: ProductOptionImage): Promise<ProductOptionImage | null>;
  abstract Delete(id: string): Promise<ProductOptionImage | null>;
}

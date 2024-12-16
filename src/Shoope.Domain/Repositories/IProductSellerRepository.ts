import { ProductSeller } from '../Entities/ProductSeller';

export abstract class IProductSellerRepository {
  abstract GetById(productId: string): Promise<ProductSeller | null>;
  abstract CheckIfExistRegisterById(id: string): Promise<ProductSeller | null>;
  abstract CheckIfExistRegisterByUserSellerProductId(
    userSellerProductId: string,
  ): Promise<ProductSeller | null>;
  abstract Create(entity: ProductSeller): Promise<ProductSeller | null>;
  abstract Update(entity: ProductSeller): Promise<ProductSeller | null>;
  abstract Delete(id: string): Promise<ProductSeller | null>;
}

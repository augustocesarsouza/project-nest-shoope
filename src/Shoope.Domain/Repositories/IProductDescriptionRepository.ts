import { ProductDescription } from '../Entities/ProductDescription';

export abstract class IProductDescriptionRepository {
  abstract GetProductDescriptionByProductId(productId: string): Promise<ProductDescription | null>;
  abstract CheckWhetherItExistOrNotRegisterByProductId(
    id: string,
  ): Promise<ProductDescription | null>;
  abstract Create(entity: ProductDescription): Promise<ProductDescription | null>;
  abstract Update(entity: ProductDescription): Promise<ProductDescription | null>;
  abstract Delete(id: string): Promise<ProductDescription | null>;
}

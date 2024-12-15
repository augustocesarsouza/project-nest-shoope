import { ProductDetail } from '../Entities/ProductDetail';

export abstract class IProductDetailRepository {
  abstract GetProductDetailByProductId(productId: string): Promise<ProductDetail | null>;
  abstract CheckWheterItExistProductDetail(id: string): Promise<ProductDetail | null>;
  abstract Create(entity: ProductDetail): Promise<ProductDetail | null>;
  abstract Update(entity: ProductDetail): Promise<ProductDetail | null>;
  abstract Delete(id: string): Promise<ProductDetail | null>;
}

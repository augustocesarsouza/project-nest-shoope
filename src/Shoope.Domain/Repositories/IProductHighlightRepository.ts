import { ProductHighlight } from '../Entities/ProductHighlight';

export abstract class IProductHighlightRepository {
  abstract GetProductHighlightById(productHighlightId: string): Promise<ProductHighlight | null>;
  abstract GetAllProductHighlight(): Promise<ProductHighlight[] | null>;
  abstract Create(entity: ProductHighlight): Promise<ProductHighlight | null>;
  abstract Update(entity: ProductHighlight): Promise<ProductHighlight | null>;
  abstract Delete(id: string): Promise<ProductHighlight | null>;
}

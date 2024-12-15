import { ProductDiscoveriesOfDay } from '../Entities/ProductDiscoveriesOfDay';

export abstract class IProductDiscoveriesOfDayRepository {
  abstract GetProductDiscoveriesOfDayById(
    productDiscoveriesOfDayId: string,
  ): Promise<ProductDiscoveriesOfDay | null>;
  abstract GetAllProductDiscoveriesOfDay(): Promise<ProductDiscoveriesOfDay[] | null>;
  abstract CheckWheterItExistProductDiscoveriesOfDay(
    id: string,
  ): Promise<ProductDiscoveriesOfDay | null>;
  abstract Create(entity: ProductDiscoveriesOfDay): Promise<ProductDiscoveriesOfDay | null>;
  abstract Update(entity: ProductDiscoveriesOfDay): Promise<ProductDiscoveriesOfDay | null>;
  abstract Delete(id: string): Promise<ProductDiscoveriesOfDay | null>;
}

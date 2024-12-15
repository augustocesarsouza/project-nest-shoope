import { ProductDiscoveriesOfDayDTO } from 'src/Shoope.Application/DTOs/ProductDiscoveriesOfDayDTO';
import { ProductDiscoveriesOfDay } from 'src/Shoope.Domain/Entities/ProductDiscoveriesOfDay';

export abstract class IProductDiscoveriesOfDayMap {
  abstract transformToDTO(entity: ProductDiscoveriesOfDay): ProductDiscoveriesOfDayDTO;
  abstract transformToEntity(entityDTO: ProductDiscoveriesOfDayDTO): ProductDiscoveriesOfDay;
  abstract transformToDTOList(entityList: ProductDiscoveriesOfDay[]): ProductDiscoveriesOfDayDTO[];
  abstract transformToEntityList(
    entityDTO: ProductDiscoveriesOfDayDTO[],
  ): ProductDiscoveriesOfDay[];
}

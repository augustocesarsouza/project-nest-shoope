import { ProductDescriptionDTO } from 'src/Shoope.Application/DTOs/ProductDescriptionDTO';
import { ProductDescription } from 'src/Shoope.Domain/Entities/ProductDescription';

export abstract class IProductDescriptionMap {
  abstract transformToDTO(entity: ProductDescription): ProductDescriptionDTO;
  abstract transformToEntity(entityDTO: ProductDescriptionDTO): ProductDescription;
  abstract transformToDTOList(entityList: ProductDescription[]): ProductDescriptionDTO[];
  abstract transformToEntityList(entityDTO: ProductDescriptionDTO[]): ProductDescription[];
}

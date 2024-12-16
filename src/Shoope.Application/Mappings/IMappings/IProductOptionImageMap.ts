import { ProductOptionImageDTO } from 'src/Shoope.Application/DTOs/ProductOptionImageDTO';
import { ProductOptionImage } from 'src/Shoope.Domain/Entities/ProductOptionImage';

export abstract class IProductOptionImageMap {
  abstract transformToDTO(entity: ProductOptionImage): ProductOptionImageDTO;
  abstract transformToEntity(entityDTO: ProductOptionImageDTO): ProductOptionImage;
  abstract transformToDTOList(ListEntity: ProductOptionImage[]): ProductOptionImageDTO[];
  abstract transformToEntityList(entityDTOList: ProductOptionImageDTO[]): ProductOptionImage[];
}

import { ProductHighlightDTO } from 'src/Shoope.Application/DTOs/ProductHighlightDTO';
import { ProductHighlight } from 'src/Shoope.Domain/Entities/ProductHighlight';

export abstract class IProductHighlightMap {
  abstract transformToDTO(entity: ProductHighlight): ProductHighlightDTO;
  abstract transformToEntity(entityDTO: ProductHighlightDTO): ProductHighlight;
  abstract transformToDTOList(ListEntity: ProductHighlight[]): ProductHighlightDTO[];
  abstract transformToEntityList(entityDTOList: ProductHighlightDTO[]): ProductHighlight[];
}

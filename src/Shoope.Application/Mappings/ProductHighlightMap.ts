import { Injectable } from '@nestjs/common';
import { IProductHighlightMap } from './IMappings/IProductHighlightMap';
import { ProductHighlight } from 'src/Shoope.Domain/Entities/ProductHighlight';
import { ProductHighlightDTO } from '../DTOs/ProductHighlightDTO';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductHighlightMap implements IProductHighlightMap {
  transformToDTO(entity: ProductHighlight): ProductHighlightDTO {
    return plainToClass(ProductHighlightDTO, entity);
  }

  transformToEntity(entityDTO: ProductHighlightDTO): ProductHighlight {
    return plainToClass(ProductHighlight, entityDTO);
  }

  transformToDTOList(entityList: ProductHighlight[]): ProductHighlightDTO[] {
    const entityAllDTO: ProductHighlightDTO[] = [];
    for (let i = 0; i < entityList.length; i++) {
      entityAllDTO.push(this.transformToDTO(entityList[i]));
    }
    return entityAllDTO;
  }

  transformToEntityList(entityDTO: ProductHighlightDTO[]): ProductHighlight[] {
    const entityAll: ProductHighlight[] = [];
    for (let i = 0; i < entityDTO.length; i++) {
      entityAll.push(this.transformToEntity(entityDTO[i]));
    }
    return entityAll;
  }
}

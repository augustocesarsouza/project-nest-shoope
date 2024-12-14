import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IProductDescriptionMap } from './IMappings/IProductDescriptionMap';
import { ProductDescription } from 'src/Shoope.Domain/Entities/ProductDescription';
import { ProductDescriptionDTO } from '../DTOs/ProductDescriptionDTO';

@Injectable()
export class ProductDescriptionMap implements IProductDescriptionMap {
  transformToDTO(entity: ProductDescription): ProductDescriptionDTO {
    return plainToClass(ProductDescriptionDTO, entity);
  }

  transformToEntity(entityDTO: ProductDescriptionDTO): ProductDescription {
    return plainToClass(ProductDescription, entityDTO);
  }

  transformToDTOList(entityList: ProductDescription[]): ProductDescriptionDTO[] {
    const entityAllDTO: ProductDescriptionDTO[] = [];
    for (let i = 0; i < entityList.length; i++) {
      entityAllDTO.push(this.transformToDTO(entityList[i]));
    }
    return entityAllDTO;
  }
  transformToEntityList(entityDTO: ProductDescriptionDTO[]): ProductDescription[] {
    const entityAll: ProductDescription[] = [];
    for (let i = 0; i < entityDTO.length; i++) {
      entityAll.push(this.transformToEntity(entityDTO[i]));
    }
    return entityAll;
  }
}

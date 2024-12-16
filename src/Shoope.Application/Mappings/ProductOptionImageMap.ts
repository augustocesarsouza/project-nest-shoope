import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ProductOptionImage } from 'src/Shoope.Domain/Entities/ProductOptionImage';
import { ProductOptionImageDTO } from '../DTOs/ProductOptionImageDTO';
import { IProductOptionImageMap } from './IMappings/IProductOptionImageMap';

@Injectable()
export class ProductOptionImageMap implements IProductOptionImageMap {
  transformToDTO(entity: ProductOptionImage): ProductOptionImageDTO {
    return plainToClass(ProductOptionImageDTO, entity);
  }

  transformToEntity(entityDTO: ProductOptionImageDTO): ProductOptionImage {
    return plainToClass(ProductOptionImage, entityDTO);
  }

  transformToDTOList(entityList: ProductOptionImage[]): ProductOptionImageDTO[] {
    const entityAllDTO: ProductOptionImageDTO[] = [];
    for (let i = 0; i < entityList.length; i++) {
      entityAllDTO.push(this.transformToDTO(entityList[i]));
    }
    return entityAllDTO;
  }

  transformToEntityList(entityDTO: ProductOptionImageDTO[]): ProductOptionImage[] {
    const entityAll: ProductOptionImage[] = [];
    for (let i = 0; i < entityDTO.length; i++) {
      entityAll.push(this.transformToEntity(entityDTO[i]));
    }
    return entityAll;
  }
}

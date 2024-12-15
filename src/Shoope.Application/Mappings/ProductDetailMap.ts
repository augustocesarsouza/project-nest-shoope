import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IProductDetailMap } from './IMappings/IProductDetailMap';
import { ProductDetailDTO } from '../DTOs/ProductDetailDTO';
import { ProductDetail } from 'src/Shoope.Domain/Entities/ProductDetail';

@Injectable()
export class ProductDetailMap implements IProductDetailMap {
  transformToDTO(entity: ProductDetail): ProductDetailDTO {
    return plainToClass(ProductDetailDTO, entity);
  }
  transformToEntity(entityDTO: ProductDetailDTO): ProductDetail {
    return plainToClass(ProductDetail, entityDTO);
  }
  transformToDTOList(entityList: ProductDetail[]): ProductDetailDTO[] {
    const entityAllDTO: ProductDetailDTO[] = [];
    for (let i = 0; i < entityList.length; i++) {
      entityAllDTO.push(this.transformToDTO(entityList[i]));
    }
    return entityAllDTO;
  }
  transformToEntityList(entityDTO: ProductDetailDTO[]): ProductDetail[] {
    const entityAll: ProductDetail[] = [];
    for (let i = 0; i < entityDTO.length; i++) {
      entityAll.push(this.transformToEntity(entityDTO[i]));
    }
    return entityAll;
  }
}

import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ProductSeller } from 'src/Shoope.Domain/Entities/ProductSeller';
import { ProductSellerDTO } from '../DTOs/ProductSellerDTO';
import { IProductSellerMap } from './IMappings/IProductSellerMap';

@Injectable()
export class ProductSellerMap implements IProductSellerMap {
  transformToDTO(entity: ProductSeller): ProductSellerDTO {
    return plainToClass(ProductSellerDTO, entity);
  }

  transformToEntity(entityDTO: ProductSellerDTO): ProductSeller {
    return plainToClass(ProductSeller, entityDTO);
  }

  transformToDTOList(entityList: ProductSeller[]): ProductSellerDTO[] {
    const entityAllDTO: ProductSellerDTO[] = [];
    for (let i = 0; i < entityList.length; i++) {
      entityAllDTO.push(this.transformToDTO(entityList[i]));
    }
    return entityAllDTO;
  }

  transformToEntityList(entityDTO: ProductSellerDTO[]): ProductSeller[] {
    const entityAll: ProductSeller[] = [];
    for (let i = 0; i < entityDTO.length; i++) {
      entityAll.push(this.transformToEntity(entityDTO[i]));
    }
    return entityAll;
  }
}

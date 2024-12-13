import { Injectable } from '@nestjs/common';
import { IProductsOfferFlashMap } from './IMappings/IProductsOfferFlashMap';
import { ProductsOfferFlashDTO } from '../DTOs/ProductsOfferFlashDTO';
import { plainToClass } from 'class-transformer';
import { ProductsOfferFlash } from 'src/Shoope.Domain/Entities/ProductsOfferFlash';

@Injectable()
export class ProductsOfferFlashMap implements IProductsOfferFlashMap {
  transformToDTO(entity: ProductsOfferFlash): ProductsOfferFlashDTO {
    return plainToClass(ProductsOfferFlashDTO, entity);
  }
  transformToEntity(entityDTO: ProductsOfferFlashDTO): ProductsOfferFlash {
    return plainToClass(ProductsOfferFlash, entityDTO);
  }
  transformToDTOList(ListEntity: ProductsOfferFlash[]): ProductsOfferFlashDTO[] {
    const entityAllDTO: ProductsOfferFlashDTO[] = [];
    for (let i = 0; i < ListEntity.length; i++) {
      entityAllDTO.push(this.transformToDTO(ListEntity[i]));
    }
    return entityAllDTO;
  }
  transformToEntityList(entityDTOList: ProductsOfferFlashDTO[]): ProductsOfferFlash[] {
    const entityAll: ProductsOfferFlash[] = [];
    for (let i = 0; i < entityDTOList.length; i++) {
      entityAll.push(this.transformToDTO(entityDTOList[i]));
    }
    return entityAll;
  }
}

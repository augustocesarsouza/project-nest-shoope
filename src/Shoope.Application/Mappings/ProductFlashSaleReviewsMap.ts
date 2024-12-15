import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IProductFlashSaleReviewsMap } from './IMappings/IProductFlashSaleReviewsMap';
import { ProductFlashSaleReviewsDTO } from '../DTOs/ProductFlashSaleReviewsDTO';
import { ProductFlashSaleReviews } from 'src/Shoope.Domain/Entities/ProductFlashSaleReviews';

@Injectable()
export class ProductFlashSaleReviewsMap implements IProductFlashSaleReviewsMap {
  transformToDTO(entity: ProductFlashSaleReviews): ProductFlashSaleReviewsDTO {
    return plainToClass(ProductFlashSaleReviewsDTO, entity);
  }

  transformToEntity(entityDTO: ProductFlashSaleReviewsDTO): ProductFlashSaleReviews {
    return plainToClass(ProductFlashSaleReviews, entityDTO);
  }

  transformToDTOList(entityList: ProductFlashSaleReviews[]): ProductFlashSaleReviewsDTO[] {
    const entityAllDTO: ProductFlashSaleReviewsDTO[] = [];
    for (let i = 0; i < entityList.length; i++) {
      entityAllDTO.push(this.transformToDTO(entityList[i]));
    }
    return entityAllDTO;
  }

  transformToEntityList(entityDTO: ProductFlashSaleReviewsDTO[]): ProductFlashSaleReviews[] {
    const entityAll: ProductFlashSaleReviews[] = [];
    for (let i = 0; i < entityDTO.length; i++) {
      entityAll.push(this.transformToEntity(entityDTO[i]));
    }
    return entityAll;
  }
}

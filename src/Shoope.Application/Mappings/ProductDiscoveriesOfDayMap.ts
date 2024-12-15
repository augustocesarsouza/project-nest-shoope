import { Injectable } from '@nestjs/common';
import { IProductDiscoveriesOfDayMap } from './IMappings/IProductDiscoveriesOfDayMap';
import { ProductDiscoveriesOfDay } from 'src/Shoope.Domain/Entities/ProductDiscoveriesOfDay';
import { ProductDiscoveriesOfDayDTO } from '../DTOs/ProductDiscoveriesOfDayDTO';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductDiscoveriesOfDayMap implements IProductDiscoveriesOfDayMap {
  transformToDTO(entity: ProductDiscoveriesOfDay): ProductDiscoveriesOfDayDTO {
    return plainToClass(ProductDiscoveriesOfDayDTO, entity);
  }

  transformToEntity(entityDTO: ProductDiscoveriesOfDayDTO): ProductDiscoveriesOfDay {
    return plainToClass(ProductDiscoveriesOfDay, entityDTO);
  }

  transformToDTOList(entityList: ProductDiscoveriesOfDay[]): ProductDiscoveriesOfDayDTO[] {
    const entityAllDTO: ProductDiscoveriesOfDayDTO[] = [];
    for (let i = 0; i < entityList.length; i++) {
      entityAllDTO.push(this.transformToDTO(entityList[i]));
    }
    return entityAllDTO;
  }

  transformToEntityList(entityDTO: ProductDiscoveriesOfDayDTO[]): ProductDiscoveriesOfDay[] {
    const entityAll: ProductDiscoveriesOfDay[] = [];
    for (let i = 0; i < entityDTO.length; i++) {
      entityAll.push(this.transformToEntity(entityDTO[i]));
    }
    return entityAll;
  }
}

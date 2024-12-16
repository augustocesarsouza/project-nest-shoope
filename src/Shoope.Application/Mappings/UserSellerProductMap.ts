import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserSellerProduct } from 'src/Shoope.Domain/Entities/UserSellerProduct';
import { UserSellerProductDTO } from '../DTOs/UserSellerProductDTO';
import { IUserSellerProductMap } from './IMappings/IUserSellerProductMap';

@Injectable()
export class UserSellerProductMap implements IUserSellerProductMap {
  transformToDTO(entity: UserSellerProduct): UserSellerProductDTO {
    return plainToClass(UserSellerProductDTO, entity);
  }

  transformToEntity(entityDTO: UserSellerProductDTO): UserSellerProduct {
    return plainToClass(UserSellerProduct, entityDTO);
  }

  transformToDTOList(entityList: UserSellerProduct[]): UserSellerProductDTO[] {
    const entityAllDTO: UserSellerProductDTO[] = [];
    for (let i = 0; i < entityList.length; i++) {
      entityAllDTO.push(this.transformToDTO(entityList[i]));
    }
    return entityAllDTO;
  }

  transformToEntityList(entityDTO: UserSellerProductDTO[]): UserSellerProduct[] {
    const entityAll: UserSellerProduct[] = [];
    for (let i = 0; i < entityDTO.length; i++) {
      entityAll.push(this.transformToEntity(entityDTO[i]));
    }
    return entityAll;
  }
}

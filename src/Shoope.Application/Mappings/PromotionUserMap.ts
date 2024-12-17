import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PromotionUser } from 'src/Shoope.Domain/Entities/PromotionUser';
import { PromotionUserDTO } from '../DTOs/PromotionUserDTO';
import { IPromotionUserMap } from './IMappings/IPromotionUserMap';

@Injectable()
export class PromotionUserMap implements IPromotionUserMap {
  transformToDTO(entity: PromotionUser): PromotionUserDTO {
    return plainToClass(PromotionUserDTO, entity);
  }

  transformToEntity(entityDTO: PromotionUserDTO): PromotionUser {
    return plainToClass(PromotionUser, entityDTO);
  }

  transformToDTOList(entityList: PromotionUser[]): PromotionUserDTO[] {
    const entityAllDTO: PromotionUserDTO[] = [];
    for (let i = 0; i < entityList.length; i++) {
      entityAllDTO.push(this.transformToDTO(entityList[i]));
    }
    return entityAllDTO;
  }

  transformToEntityList(entityDTO: PromotionUserDTO[]): PromotionUser[] {
    const entityAll: PromotionUser[] = [];
    for (let i = 0; i < entityDTO.length; i++) {
      entityAll.push(this.transformToEntity(entityDTO[i]));
    }
    return entityAll;
  }
}

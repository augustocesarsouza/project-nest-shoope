import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PromotionDTO } from '../DTOs/PromotionDTO';
import { Promotion } from 'src/Shoope.Domain/Entities/Promotion';
import { IPromotionMap } from './IMappings/IPromotionMap';

@Injectable()
export class PromotionMap implements IPromotionMap {
  transformToDTO(entity: Promotion): PromotionDTO {
    return plainToClass(PromotionDTO, entity);
  }

  transformToEntity(entityDTO: PromotionDTO): Promotion {
    return plainToClass(Promotion, entityDTO);
  }

  transformToDTOList(entityList: Promotion[]): PromotionDTO[] {
    const entityAllDTO: PromotionDTO[] = [];
    for (let i = 0; i < entityList.length; i++) {
      entityAllDTO.push(this.transformToDTO(entityList[i]));
    }
    return entityAllDTO;
  }

  transformToEntityList(entityDTO: PromotionDTO[]): Promotion[] {
    const entityAll: Promotion[] = [];
    for (let i = 0; i < entityDTO.length; i++) {
      entityAll.push(this.transformToEntity(entityDTO[i]));
    }
    return entityAll;
  }
}

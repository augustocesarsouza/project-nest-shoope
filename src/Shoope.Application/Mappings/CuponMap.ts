import { Injectable } from '@nestjs/common';
import { ICuponMap } from './IMappings/ICuponMap';
import { Cupon } from 'src/Shoope.Domain/Entities/Cupon';
import { CuponDTO } from '../DTOs/CuponDTO';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CuponMap implements ICuponMap {
  transformToDTO(entity: Cupon): CuponDTO {
    return plainToClass(CuponDTO, entity);
  }
  transformToEntity(entityDTO: CuponDTO): Cupon {
    return plainToClass(Cupon, entityDTO);
  }
  transformToDTOList(entityList: Cupon[]): CuponDTO[] {
    const entityAllDTO: CuponDTO[] = [];
    for (let i = 0; i < entityList.length; i++) {
      entityAllDTO.push(this.transformToDTO(entityList[i]));
    }
    return entityAllDTO;
  }
  transformToEntityList(entityDTO: CuponDTO[]): Cupon[] {
    const entityAll: Cupon[] = [];
    for (let i = 0; i < entityDTO.length; i++) {
      entityAll.push(this.transformToEntity(entityDTO[i]));
    }
    return entityAll;
  }
}

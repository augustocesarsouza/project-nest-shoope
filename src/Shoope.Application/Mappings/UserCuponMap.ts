import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IUserCuponMap } from './IMappings/IUserCuponMap';
import { UserCuponDTO } from '../DTOs/UserCuponDTO';
import { UserCupon } from 'src/Shoope.Domain/Entities/UserCupon';

@Injectable()
export class UserCuponMap implements IUserCuponMap {
  transformToDTO(entity: UserCupon): UserCuponDTO {
    return plainToClass(UserCuponDTO, entity);
  }

  transformToEntity(entityDTO: UserCuponDTO): UserCupon {
    return plainToClass(UserCupon, entityDTO);
  }

  transformToDTOList(entityList: UserCupon[]): UserCuponDTO[] {
    const entityAllDTO: UserCuponDTO[] = [];
    for (let i = 0; i < entityList.length; i++) {
      entityAllDTO.push(this.transformToDTO(entityList[i]));
    }
    return entityAllDTO;
  }

  transformToEntityList(entityDTO: UserCuponDTO[]): UserCupon[] {
    const entityAll: UserCupon[] = [];
    for (let i = 0; i < entityDTO.length; i++) {
      entityAll.push(this.transformToEntity(entityDTO[i]));
    }
    return entityAll;
  }
}

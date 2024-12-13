import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IFlashSaleProductAllInfoMap } from './IMappings/IFlashSaleProductAllInfoMap';
import { FlashSaleProductAllInfoDTO } from '../DTOs/FlashSaleProductAllInfoDTO';
import { FlashSaleProductAllInfo } from 'src/Shoope.Domain/Entities/FlashSaleProductAllInfo';

@Injectable()
export class FlashSaleProductAllInfoMap implements IFlashSaleProductAllInfoMap {
  transformToDTO(entity: FlashSaleProductAllInfo): FlashSaleProductAllInfoDTO {
    return plainToClass(FlashSaleProductAllInfoDTO, entity);
  }

  transformToEntity(entityDTO: FlashSaleProductAllInfoDTO): FlashSaleProductAllInfo {
    return plainToClass(FlashSaleProductAllInfo, entityDTO);
  }

  transformToDTOList(ListEntity: FlashSaleProductAllInfo[]): FlashSaleProductAllInfoDTO[] {
    const entityAllDTO: FlashSaleProductAllInfoDTO[] = [];
    for (let i = 0; i < ListEntity.length; i++) {
      entityAllDTO.push(this.transformToDTO(ListEntity[i]));
    }
    return entityAllDTO;
  }

  transformToEntityList(entityDTOList: FlashSaleProductAllInfoDTO[]): FlashSaleProductAllInfo[] {
    const entityAll: FlashSaleProductAllInfo[] = [];
    for (let i = 0; i < entityDTOList.length; i++) {
      entityAll.push(this.transformToDTO(entityDTOList[i]));
    }
    return entityAll;
  }
}

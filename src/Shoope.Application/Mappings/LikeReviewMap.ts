import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ILikeReviewMap } from './IMappings/ILikeReviewMap';
import { LikeReviewDTO } from '../DTOs/LikeReviewDTO';
import { LikeReview } from 'src/Shoope.Domain/Entities/LikeReview';

@Injectable()
export class LikeReviewMap implements ILikeReviewMap {
  transformToDTO(entity: LikeReview): LikeReviewDTO {
    return plainToClass(LikeReviewDTO, entity);
  }

  transformToEntity(entityDTO: LikeReviewDTO): LikeReview {
    return plainToClass(LikeReview, entityDTO);
  }

  transformToDTOList(entityList: LikeReview[]): LikeReviewDTO[] {
    const entityAllDTO: LikeReviewDTO[] = [];
    for (let i = 0; i < entityList.length; i++) {
      entityAllDTO.push(this.transformToDTO(entityList[i]));
    }
    return entityAllDTO;
  }

  transformToEntityList(entityDTO: LikeReviewDTO[]): LikeReview[] {
    const entityAll: LikeReview[] = [];
    for (let i = 0; i < entityDTO.length; i++) {
      entityAll.push(this.transformToEntity(entityDTO[i]));
    }
    return entityAll;
  }
}

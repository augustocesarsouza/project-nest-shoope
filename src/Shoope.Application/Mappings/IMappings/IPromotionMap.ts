import { PromotionDTO } from 'src/Shoope.Application/DTOs/PromotionDTO';
import { Promotion } from 'src/Shoope.Domain/Entities/Promotion';

export abstract class IPromotionMap {
  abstract transformToDTO(entity: Promotion): PromotionDTO;
  abstract transformToEntity(entityDTO: PromotionDTO): Promotion;
  abstract transformToDTOList(ListEntity: Promotion[]): PromotionDTO[];
  abstract transformToEntityList(entityDTOList: PromotionDTO[]): Promotion[];
}

import { PromotionUserDTO } from 'src/Shoope.Application/DTOs/PromotionUserDTO';
import { PromotionUser } from 'src/Shoope.Domain/Entities/PromotionUser';

export abstract class IPromotionUserMap {
  abstract transformToDTO(entity: PromotionUser): PromotionUserDTO;
  abstract transformToEntity(entityDTO: PromotionUserDTO): PromotionUser;
  abstract transformToDTOList(ListEntity: PromotionUser[]): PromotionUserDTO[];
  abstract transformToEntityList(entityDTOList: PromotionUserDTO[]): PromotionUser[];
}

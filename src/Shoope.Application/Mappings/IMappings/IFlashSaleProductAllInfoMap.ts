import { FlashSaleProductAllInfoDTO } from 'src/Shoope.Application/DTOs/FlashSaleProductAllInfoDTO';
import { FlashSaleProductAllInfo } from 'src/Shoope.Domain/Entities/FlashSaleProductAllInfo';

export abstract class IFlashSaleProductAllInfoMap {
  abstract transformToDTO(entity: FlashSaleProductAllInfo): FlashSaleProductAllInfoDTO;
  abstract transformToEntity(entityDTO: FlashSaleProductAllInfoDTO): FlashSaleProductAllInfo;
  abstract transformToDTOList(ListEntity: FlashSaleProductAllInfo[]): FlashSaleProductAllInfoDTO[];
  abstract transformToEntityList(
    entityDTOList: FlashSaleProductAllInfoDTO[],
  ): FlashSaleProductAllInfo[];
}

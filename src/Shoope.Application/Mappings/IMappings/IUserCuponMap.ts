import { UserCuponDTO } from 'src/Shoope.Application/DTOs/UserCuponDTO';
import { UserCupon } from 'src/Shoope.Domain/Entities/UserCupon';

export abstract class IUserCuponMap {
  abstract transformToDTO(entity: UserCupon): UserCuponDTO;
  abstract transformToEntity(entityDTO: UserCuponDTO): UserCupon;
  abstract transformToDTOList(ListEntity: UserCupon[]): UserCuponDTO[];
  abstract transformToEntityList(entityDTOList: UserCuponDTO[]): UserCupon[];
}

import { CuponDTO } from 'src/Shoope.Application/DTOs/CuponDTO';
import { Cupon } from 'src/Shoope.Domain/Entities/Cupon';

export abstract class ICuponMap {
  abstract transformToDTO(entity: Cupon): CuponDTO;
  abstract transformToEntity(entityDTO: CuponDTO): Cupon;
  abstract transformToDTOList(entityList: Cupon[]): CuponDTO[];
  abstract transformToEntityList(entityDTO: CuponDTO[]): Cupon[];
}

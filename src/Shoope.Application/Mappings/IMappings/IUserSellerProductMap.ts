import { UserSellerProductDTO } from 'src/Shoope.Application/DTOs/UserSellerProductDTO';
import { UserSellerProduct } from 'src/Shoope.Domain/Entities/UserSellerProduct';

export abstract class IUserSellerProductMap {
  abstract transformToDTO(entity: UserSellerProduct): UserSellerProductDTO;
  abstract transformToEntity(entityDTO: UserSellerProductDTO): UserSellerProduct;
  abstract transformToDTOList(ListEntity: UserSellerProduct[]): UserSellerProductDTO[];
  abstract transformToEntityList(entityDTOList: UserSellerProductDTO[]): UserSellerProduct[];
}

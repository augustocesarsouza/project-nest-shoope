import { ProductSellerDTO } from 'src/Shoope.Application/DTOs/ProductSellerDTO';
import { ProductSeller } from 'src/Shoope.Domain/Entities/ProductSeller';

export abstract class IProductSellerMap {
  abstract transformToDTO(entity: ProductSeller): ProductSellerDTO;
  abstract transformToEntity(entityDTO: ProductSellerDTO): ProductSeller;
  abstract transformToDTOList(ListEntity: ProductSeller[]): ProductSellerDTO[];
  abstract transformToEntityList(entityDTOList: ProductSellerDTO[]): ProductSeller[];
}

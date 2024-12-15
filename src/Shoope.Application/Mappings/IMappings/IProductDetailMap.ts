import { ProductDetailDTO } from 'src/Shoope.Application/DTOs/ProductDetailDTO';
import { ProductDetail } from 'src/Shoope.Domain/Entities/ProductDetail';

export abstract class IProductDetailMap {
  abstract transformToDTO(entity: ProductDetail): ProductDetailDTO;
  abstract transformToEntity(entityDTO: ProductDetailDTO): ProductDetail;
  abstract transformToDTOList(entityList: ProductDetail[]): ProductDetailDTO[];
  abstract transformToEntityList(entityDTO: ProductDetailDTO[]): ProductDetail[];
}

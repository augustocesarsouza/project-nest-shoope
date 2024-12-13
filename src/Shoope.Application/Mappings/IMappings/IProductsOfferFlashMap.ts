import { ProductsOfferFlashDTO } from 'src/Shoope.Application/DTOs/ProductsOfferFlashDTO';
import { ProductsOfferFlash } from 'src/Shoope.Domain/Entities/ProductsOfferFlash';

export abstract class IProductsOfferFlashMap {
  abstract transformToDTO(entity: ProductsOfferFlash): ProductsOfferFlashDTO;
  abstract transformToEntity(entityDTO: ProductsOfferFlashDTO): ProductsOfferFlash;
  abstract transformToDTOList(ListEntity: ProductsOfferFlash[]): ProductsOfferFlashDTO[];
  abstract transformToEntityList(entityDTOList: ProductsOfferFlashDTO[]): ProductsOfferFlash[];
}

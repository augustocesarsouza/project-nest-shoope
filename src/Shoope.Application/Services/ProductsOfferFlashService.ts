import { Injectable } from '@nestjs/common';
import { IProductsOfferFlashService } from './Interfaces/IProductsOfferFlashService';
import { IProductsOfferFlashRepository } from 'src/Shoope.Domain/Repositories/IProductsOfferFlashRepository';
import { IClodinaryUti } from 'src/Shoope.Infra.Data/UtilityExternal/Interface/IClodinaryUti';
import { IProductsOfferFlashMap } from '../Mappings/IMappings/IProductsOfferFlashMap';
import { ProductsOfferFlashDTO } from '../DTOs/ProductsOfferFlashDTO';
import { ResultService } from './ResultService';
import { v4 as uuidv4 } from 'uuid';
import { ProductsOfferFlashDTOValidateCreate } from '../DTOs/Validations/ProductsOfferFlashDTOValidate/ProductsOfferFlashDTOValidateCreate';
import { ProductOfferFlashType } from 'src/Shoope.Domain/Enums/ProductOfferFlashType';
import { ProductsOfferFlash } from 'src/Shoope.Domain/Entities/ProductsOfferFlash';

@Injectable()
export class ProductsOfferFlashService implements IProductsOfferFlashService {
  constructor(
    private readonly _productsOfferFlashRepository: IProductsOfferFlashRepository,
    private readonly _productsOfferFlashMap: IProductsOfferFlashMap,
    private readonly _clodinaryUti: IClodinaryUti,
  ) {}

  async GetAllProduct(): Promise<ResultService<ProductsOfferFlashDTO[] | null>> {
    try {
      const productsOfferFlashList = await this._productsOfferFlashRepository.GetAllProduct();

      if (!productsOfferFlashList) {
        return ResultService.fail<ProductsOfferFlashDTO[] | null>('Address not found');
      }

      return ResultService.ok<ProductsOfferFlashDTO[]>(
        this._productsOfferFlashMap.transformToDTOList(productsOfferFlashList),
      );
    } catch (error) {
      return ResultService.fail<ProductsOfferFlashDTO[] | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async GetAllByTagProduct(
    hourFlashOffer: string,
    tagProduct: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<ResultService<ProductsOfferFlashDTO[] | null>> {
    try {
      const productsOfferFlashList = await this._productsOfferFlashRepository.GetAllByTagProduct(
        hourFlashOffer,
        tagProduct,
        pageNumber,
        pageSize,
      );

      if (!productsOfferFlashList) {
        return ResultService.fail<ProductsOfferFlashDTO[] | null>('Address not found');
      }

      return ResultService.ok<ProductsOfferFlashDTO[]>(
        this._productsOfferFlashMap.transformToDTOList(productsOfferFlashList),
      );
    } catch (error) {
      return ResultService.fail<ProductsOfferFlashDTO[] | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Create(
    productsOfferFlashDTOValidateCreate: ProductsOfferFlashDTOValidateCreate | null,
  ): Promise<ResultService<ProductsOfferFlashDTO | null>> {
    try {
      if (!productsOfferFlashDTOValidateCreate)
        return ResultService.fail<ProductsOfferFlashDTO | null>('DTO Is Null');

      const type = productsOfferFlashDTOValidateCreate.tagProduct as ProductOfferFlashType;
      const description = this.GetEnumDescription(type);

      const result = await this._clodinaryUti.CreateMedia(
        productsOfferFlashDTOValidateCreate.imgProduct,
        'img-flash-deals',
        320,
        320,
      );

      if (!result.createdSuccessfully)
        return ResultService.fail<ProductsOfferFlashDTO | null>(
          'Invalid media type. Only images and videos are supported.',
        );

      if (result.imgUrl === null || result.publicId === null)
        return ResultService.fail<ProductsOfferFlashDTO | null>(
          'Error creating image on Cloudinary',
        );

      const id = uuidv4();

      const ProductsOfferFlashNew = new ProductsOfferFlash(
        id,
        result.imgUrl,
        productsOfferFlashDTOValidateCreate.altValue,
        productsOfferFlashDTOValidateCreate.imgPartBottom,
        productsOfferFlashDTOValidateCreate.priceProduct,
        productsOfferFlashDTOValidateCreate.popularityPercentage,
        productsOfferFlashDTOValidateCreate.discountPercentage,
        productsOfferFlashDTOValidateCreate.hourFlashOffer,
        productsOfferFlashDTOValidateCreate.title,
        description,
      );

      const productsOfferFlashCreate =
        await this._productsOfferFlashRepository.Create(ProductsOfferFlashNew);

      return ResultService.ok<ProductsOfferFlashDTO>(
        this._productsOfferFlashMap.transformToDTO(productsOfferFlashCreate),
      );
    } catch (error) {
      return ResultService.fail<ProductsOfferFlashDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  private GetEnumDescription(type: ProductOfferFlashType): string {
    const descriptions: Record<ProductOfferFlashType, string> = {
      [ProductOfferFlashType.Most_Popular]: 'Mais_Populares',
      [ProductOfferFlashType.Official_Stores]: 'Lojas_Oficiais',
      [ProductOfferFlashType.Top_Deals]: 'Top_Ofertas',
      [ProductOfferFlashType.Fashion]: 'Moda',
      [ProductOfferFlashType.Beauty_and_Personal_Care]: 'Beleza_e_Cuidado_Pessoal',
      [ProductOfferFlashType.International_Offers]: 'Ofertas_Internacionais',
      [ProductOfferFlashType.Kids_Fashion]: 'Moda_Infantil',
      [ProductOfferFlashType.Grocery_and_Pets]: 'Mercado_e_Pets',
      [ProductOfferFlashType.Home_and_Kitchen]: 'Casa_e_Cozinha',
      [ProductOfferFlashType.Toys]: 'Brinquedos',
      [ProductOfferFlashType.Electronics]: 'Eletrônicos',
      [ProductOfferFlashType.Baby_Care]: 'Cuidados_para_o_Bebê',
      [ProductOfferFlashType.Books_and_Stationery]: 'Livros_e_Papelaria',
      [ProductOfferFlashType.Computers_and_Accessories]: 'Computadores_e_Acessórios',
      [ProductOfferFlashType.Mobile_Phones_and_Devices]: 'Celulares_e_Dispositivos',
      [ProductOfferFlashType.Auto_and_Moto]: 'Auto_e_Moto',
      [ProductOfferFlashType.Sports_and_Leisure]: 'Esportes_e_Lazer',
      [ProductOfferFlashType.More_Local_Deals]: 'Mais_Ofertas_Locais',
    };

    return descriptions[type] || type;
  }

  private isValidTagProduct(tagProduct: string): boolean {
    return Object.values(ProductOfferFlashType).includes(tagProduct as ProductOfferFlashType);
  }

  async Delete(productsOfferFlashId: string): Promise<ResultService<ProductsOfferFlashDTO | null>> {
    try {
      // quando deletar um registro aqui tem que ver se tem registro aqui "FlashSaleProductAllInfo"

      const productsOfferFlashForDelete =
        await this._productsOfferFlashRepository.GetByProductsOfferFlashId(productsOfferFlashId);

      if (productsOfferFlashForDelete === null)
        return ResultService.fail<ProductsOfferFlashDTO | null>('Category not found');

      const deleteFound = await this._clodinaryUti.DeleteFileCloudinaryExtractingPublicIdFromUrl(
        productsOfferFlashForDelete.imgProduct,
        'image',
      );

      if (!deleteFound.deleteSuccessfully)
        return ResultService.fail<ProductsOfferFlashDTO | null>(deleteFound.message);

      const productsOfferFlashDeleteSuccessfully = await this._productsOfferFlashRepository.Delete(
        productsOfferFlashForDelete.id,
      );

      return ResultService.ok<ProductsOfferFlashDTO>(
        this._productsOfferFlashMap.transformToDTO(productsOfferFlashDeleteSuccessfully),
      );
    } catch (error) {
      return ResultService.fail<ProductsOfferFlashDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }
}

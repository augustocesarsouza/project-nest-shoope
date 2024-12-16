import { Injectable } from '@nestjs/common';
import { IProductOptionImageService } from './Interfaces/IProductOptionImageService';
import { IProductOptionImageRepository } from 'src/Shoope.Domain/Repositories/IProductOptionImageRepository';
import { IClodinaryUti } from 'src/Shoope.Infra.Data/UtilityExternal/Interface/IClodinaryUti';
import { IProductOptionImageMap } from '../Mappings/IMappings/IProductOptionImageMap';
import { ProductOptionImageDTO } from '../DTOs/ProductOptionImageDTO';
import { ResultService } from './ResultService';
import { ProductOptionImageDTOValidateCreate } from '../DTOs/Validations/ProductOptionImageDTOValidate/ProductOptionImageDTOValidateCreate';
import { v4 as uuidv4 } from 'uuid';
import { ProductOptionImage } from 'src/Shoope.Domain/Entities/ProductOptionImage';

@Injectable()
export class ProductOptionImageService implements IProductOptionImageService {
  constructor(
    private readonly _productOptionImageRepository: IProductOptionImageRepository,
    private readonly _productOptionImageMap: IProductOptionImageMap,
    private readonly _clodinaryUti: IClodinaryUti,
  ) {}

  async GetByListFlashSaleProductImageAllId(
    productsOfferFlashId: string,
  ): Promise<ResultService<ProductOptionImageDTO[] | null>> {
    try {
      const productOptionImageList =
        await this._productOptionImageRepository.GetByListFlashSaleProductImageAllId(
          productsOfferFlashId,
        );

      if (!productOptionImageList) {
        return ResultService.fail<ProductOptionImageDTO[] | null>('Address not found');
      }

      return ResultService.ok<ProductOptionImageDTO[]>(
        this._productOptionImageMap.transformToDTOList(productOptionImageList),
      );
    } catch (error) {
      return ResultService.fail<ProductOptionImageDTO[] | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Create(
    productOptionImageDTOValidateCreate: ProductOptionImageDTOValidateCreate | null,
  ): Promise<ResultService<ProductOptionImageDTO | null>> {
    try {
      if (productOptionImageDTOValidateCreate === null)
        ResultService.fail<ProductOptionImageDTO | null>('DTO is null');

      const result = await this._clodinaryUti.CreateMedia(
        productOptionImageDTOValidateCreate.imageBase64,
        'product-option-image',
        450,
        450,
      );

      if (!result.createdSuccessfully)
        return ResultService.fail<ProductOptionImageDTO | null>(
          'Invalid media type. Only images and videos are supported.',
        );

      if (result.imgUrl === null || result.publicId === null)
        return ResultService.fail<ProductOptionImageDTO | null>(
          'Error creating image on Cloudinary',
        );

      const id = uuidv4();
      const productOptionImage = new ProductOptionImage(
        id,
        productOptionImageDTOValidateCreate.optionType,
        productOptionImageDTOValidateCreate.imgAlt,
        result.imgUrl,
        productOptionImageDTOValidateCreate.titleOptionType,
        productOptionImageDTOValidateCreate.productsOfferFlashId,
      );

      const productOptionImageCreated =
        await this._productOptionImageRepository.Create(productOptionImage);

      return ResultService.ok<ProductOptionImageDTO>(
        this._productOptionImageMap.transformToDTO(productOptionImageCreated),
      );
    } catch (error) {
      return ResultService.fail<ProductOptionImageDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async DeleteAllByProductsOfferFlashId(
    productsOfferFlashId: string,
  ): Promise<ResultService<string | null>> {
    try {
      const productsOfferFlashList =
        await this._productOptionImageRepository.GetAllByProductsOfferFlashId(productsOfferFlashId);

      if (productsOfferFlashList === null)
        return ResultService.fail<string | null>('productOptionImage not found');

      if (productsOfferFlashList.length <= 0)
        return ResultService.fail<string | null>('nothing was found');

      for (let i = 0; i < productsOfferFlashList.length; i++) {
        const element = productsOfferFlashList[i];

        const deleteFile = await this._clodinaryUti.DeleteFileCloudinaryExtractingPublicIdFromUrl(
          element.imageUrl,
          'image',
        );

        if (!deleteFile.deleteSuccessfully)
          return ResultService.fail<string | null>(deleteFile.message);

        await this._productOptionImageRepository.Delete(element.id);
      }

      return ResultService.ok<string | null>('delete successfully');
    } catch (error) {
      return ResultService.fail<string | null>(error.message || 'An unexpected error occurred');
    }
  }
}

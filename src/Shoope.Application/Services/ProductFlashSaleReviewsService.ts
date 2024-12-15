import { Injectable } from '@nestjs/common';
import { IProductFlashSaleReviewsService } from './Interfaces/IProductFlashSaleReviewsService';
import { ResultService } from './ResultService';
import { ProductFlashSaleReviewsDTO } from '../DTOs/ProductFlashSaleReviewsDTO';
import { IProductFlashSaleReviewsRepository } from 'src/Shoope.Domain/Repositories/IProductFlashSaleReviewsRepository';
import { IClodinaryUti } from 'src/Shoope.Infra.Data/UtilityExternal/Interface/IClodinaryUti';
import { IProductFlashSaleReviewsMap } from '../Mappings/IMappings/IProductFlashSaleReviewsMap';
import { ProductFlashSaleReviewsDTOValidateCreate } from '../DTOs/Validations/ProductFlashSaleReviewsDTOValidate/ProductFlashSaleReviewsDTOValidateCreate';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';
import { ProductFlashSaleReviews } from 'src/Shoope.Domain/Entities/ProductFlashSaleReviews';

@Injectable()
export class ProductFlashSaleReviewsService implements IProductFlashSaleReviewsService {
  constructor(
    private readonly _productFlashSaleReviewsRepository: IProductFlashSaleReviewsRepository,
    private readonly _productFlashSaleReviewsMap: IProductFlashSaleReviewsMap,
    private readonly _clodinaryUti: IClodinaryUti,
  ) {}

  async GetAllProductFlashSaleReviewsByProductFlashSaleId(
    productFlashSaleId: string,
  ): Promise<ResultService<ProductFlashSaleReviewsDTO[] | null>> {
    try {
      const productFlashSaleReviewsList =
        await this._productFlashSaleReviewsRepository.GetAllProductFlashSaleReviewsByProductFlashSaleId(
          productFlashSaleId,
        );

      if (!productFlashSaleReviewsList) {
        return ResultService.fail<ProductFlashSaleReviewsDTO[] | null>('Address not found');
      }

      return ResultService.ok<ProductFlashSaleReviewsDTO[]>(
        this._productFlashSaleReviewsMap.transformToDTOList(productFlashSaleReviewsList),
      );
    } catch (error) {
      return ResultService.fail<ProductFlashSaleReviewsDTO[] | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Create(
    productFlashSaleReviewsDTOValidateCreate: ProductFlashSaleReviewsDTOValidateCreate | null,
  ): Promise<ResultService<ProductFlashSaleReviewsDTO | null>> {
    try {
      if (productFlashSaleReviewsDTOValidateCreate === null)
        ResultService.fail<ProductFlashSaleReviewsDTO | null>('DTO is null');

      const imgAndVideoReviewsProductList: string[] = [];

      for (
        let i = 0;
        i < productFlashSaleReviewsDTOValidateCreate.imgAndVideoReviewsProductElements.length;
        i++
      ) {
        const element =
          productFlashSaleReviewsDTOValidateCreate.imgAndVideoReviewsProductElements[i];
        const isImage = element.startsWith('data:image');
        const isVideo = element.startsWith('data:video');

        if (isImage) {
          const base64String = element.split(',')[1];
          const imageBuffer = Buffer.from(base64String, 'base64');

          // Obtemos as dimensões da imagem
          const metadata = await sharp(imageBuffer).metadata();
          const width = metadata.width;
          const height = metadata.height;

          const result = await this._clodinaryUti.CreateMedia(
            element,
            'reviews-product-flash-sale-img-and-video',
            width,
            height,
          );

          if (!result.imgUrl || !result.publicId) {
            return ResultService.fail<ProductFlashSaleReviewsDTO | null>(
              'Error when creating ImgPerfil.',
            );
          }

          imgAndVideoReviewsProductList.push(result.imgUrl);
        } else if (isVideo) {
          const result = await this._clodinaryUti.CreateMedia(
            element,
            'reviews-product-flash-sale-img-and-video',
            517,
            919,
          );

          if (!result.imgUrl || !result.publicId) {
            return ResultService.fail<ProductFlashSaleReviewsDTO | null>(
              'Error when creating ImgPerfil.',
            );
          }

          imgAndVideoReviewsProductList.push(result.imgUrl);
        }
      }

      const id = uuidv4();
      const creationDate = new Date();
      const productFlashSaleReviews = new ProductFlashSaleReviews(
        id,
        productFlashSaleReviewsDTOValidateCreate.message,
        creationDate,
        productFlashSaleReviewsDTOValidateCreate.costBenefit,
        productFlashSaleReviewsDTOValidateCreate.similarToAd,
        productFlashSaleReviewsDTOValidateCreate.starQuantity,
        productFlashSaleReviewsDTOValidateCreate.productsOfferFlashId,
        productFlashSaleReviewsDTOValidateCreate.userId,
        null,
        imgAndVideoReviewsProductList,
        productFlashSaleReviewsDTOValidateCreate.variation,
      );

      const productFlashSaleReviewsCreate =
        await this._productFlashSaleReviewsRepository.Create(productFlashSaleReviews);

      return ResultService.ok<ProductFlashSaleReviewsDTO>(
        this._productFlashSaleReviewsMap.transformToDTO(productFlashSaleReviewsCreate),
      );
    } catch (error) {
      return ResultService.fail<ProductFlashSaleReviewsDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Delete(id: string): Promise<ResultService<ProductFlashSaleReviewsDTO | null>> {
    try {
      const productFlashSaleReviewsDelete =
        await this._productFlashSaleReviewsRepository.CheckWheterItExistProductFlashSaleReviews(id);

      if (productFlashSaleReviewsDelete === null)
        return ResultService.fail<ProductFlashSaleReviewsDTO | null>(
          'ProductDiscoveriesOfDayDTO not found',
        );

      for (let i = 0; i < productFlashSaleReviewsDelete.imgAndVideoReviewsProduct.length; i++) {
        const el = productFlashSaleReviewsDelete.imgAndVideoReviewsProduct[i];

        const isImage = el.includes('/image/');
        const isVideo = el.includes('/video/');

        if (isImage) {
          const deleteFound =
            await this._clodinaryUti.DeleteFileCloudinaryExtractingPublicIdFromUrl(el, 'image');

          if (!deleteFound.deleteSuccessfully)
            return ResultService.fail<ProductFlashSaleReviewsDTO | null>(deleteFound.message);
        } else if (isVideo) {
          const deleteFound =
            await this._clodinaryUti.DeleteFileCloudinaryExtractingPublicIdFromUrl(el, 'video');

          if (!deleteFound.deleteSuccessfully)
            return ResultService.fail<ProductFlashSaleReviewsDTO | null>(deleteFound.message);
        }
      }

      const productFlashSaleReviewsSuccessfully =
        await this._productFlashSaleReviewsRepository.Delete(productFlashSaleReviewsDelete.id);

      return ResultService.ok<ProductFlashSaleReviewsDTO>(
        this._productFlashSaleReviewsMap.transformToDTO(productFlashSaleReviewsSuccessfully),
      );
    } catch (error) {
      return ResultService.fail<ProductFlashSaleReviewsDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }
}

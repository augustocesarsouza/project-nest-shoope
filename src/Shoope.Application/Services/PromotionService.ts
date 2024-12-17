import { Injectable } from '@nestjs/common';
import { IPromotionRepository } from 'src/Shoope.Domain/Repositories/IPromotionRepository';
import { IClodinaryUti } from 'src/Shoope.Infra.Data/UtilityExternal/Interface/IClodinaryUti';
import { ResultService } from './ResultService';
import { PromotionDTO } from '../DTOs/PromotionDTO';
import { IPromotionMap } from '../Mappings/IMappings/IPromotionMap';
import { IPromotionService } from './Interfaces/IPromotionService';
import { PromotionDTOValidateCreate } from '../DTOs/Validations/PromotionDTOValidate/PromotionDTOValidateCreate';
import { Promotion } from 'src/Shoope.Domain/Entities/Promotion';
import { v4 as uuidv4 } from 'uuid';
import { IPromotionUserService } from './Interfaces/IPromotionUserService';
// import { DateTime } from 'luxon';

@Injectable()
export class PromotionService implements IPromotionService {
  constructor(
    private readonly _promotionRepository: IPromotionRepository,
    private readonly _promotionUserService: IPromotionUserService,
    private readonly _promotionMap: IPromotionMap,
    private readonly _clodinaryUti: IClodinaryUti,
  ) {}

  async GetById(promotionId: string): Promise<ResultService<PromotionDTO | null>> {
    try {
      const promotion = await this._promotionRepository.GetById(promotionId);

      if (!promotion) {
        return ResultService.fail<PromotionDTO | null>('Promotion not found');
      }

      return ResultService.ok<PromotionDTO>(this._promotionMap.transformToDTO(promotion));
    } catch (error) {
      return ResultService.fail<PromotionDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Create(
    promotionDTOValidateCreate: PromotionDTOValidateCreate | null,
  ): Promise<ResultService<PromotionDTO | null>> {
    try {
      if (!promotionDTOValidateCreate)
        return ResultService.fail<PromotionDTO | null>('DTO Is Null');

      const id = uuidv4();

      const stringCortada = promotionDTOValidateCreate.dateCreate;
      const [datePart, timePart] = stringCortada.split(' ');

      const [day, month, year] = datePart.split('/').map((value) => parseInt(value, 10));
      const [hour, minute] = timePart.split(':').map((value) => parseInt(value, 10));

      // Criação da data no UTC
      const parsedDate = new Date(year, month - 1, day, hour, minute);

      if (promotionDTOValidateCreate.whatIsThePromotion === 2) {
        const result = await this._clodinaryUti.CreateMedia(
          promotionDTOValidateCreate.img,
          'img-shopee',
          360,
          360,
        );

        if (!result.createdSuccessfully)
          return ResultService.fail<PromotionDTO | null>(
            'Invalid media type. Only images and videos are supported.',
          );

        if (result.imgUrl === null || result.publicId === null)
          return ResultService.fail<PromotionDTO | null>('Error creating image on Cloudinary');

        const resultCreateImgFirst = await this._clodinaryUti.CreateMedia(
          promotionDTOValidateCreate.imgInnerFirst,
          'img-shopee',
          360,
          360,
        );

        if (!resultCreateImgFirst.createdSuccessfully)
          return ResultService.fail<PromotionDTO | null>(
            'Invalid media type. Only images and videos are supported.',
          );

        if (resultCreateImgFirst.imgUrl === null || resultCreateImgFirst.publicId === null)
          return ResultService.fail<PromotionDTO | null>('Error creating image on Cloudinary');

        const resultCreateImgSecond = await this._clodinaryUti.CreateMedia(
          promotionDTOValidateCreate.imgInnerSecond,
          'img-shopee',
          360,
          360,
        );

        if (!resultCreateImgSecond.createdSuccessfully)
          return ResultService.fail<PromotionDTO | null>(
            'Invalid media type. Only images and videos are supported.',
          );

        if (resultCreateImgSecond.imgUrl === null || resultCreateImgSecond.publicId === null)
          return ResultService.fail<PromotionDTO | null>('Error creating image on Cloudinary');

        const resultCreateImgThird = await this._clodinaryUti.CreateMedia(
          promotionDTOValidateCreate.imgInnerThird,
          'img-shopee',
          360,
          360,
        );

        if (!resultCreateImgThird.createdSuccessfully)
          return ResultService.fail<PromotionDTO | null>(
            'Invalid media type. Only images and videos are supported.',
          );

        if (resultCreateImgThird.imgUrl === null || resultCreateImgThird.publicId === null)
          return ResultService.fail<PromotionDTO | null>('Error creating image on Cloudinary');

        const promotion = new Promotion(
          id,
          promotionDTOValidateCreate.whatIsThePromotion,
          promotionDTOValidateCreate.title,
          promotionDTOValidateCreate.description,
          parsedDate,
          result.imgUrl,
          resultCreateImgFirst.imgUrl,
          promotionDTOValidateCreate.altImgInnerFirst,
          resultCreateImgSecond.imgUrl,
          promotionDTOValidateCreate.altImgInnerSecond,
          resultCreateImgThird.imgUrl,
          promotionDTOValidateCreate.altImgInnerThird,
        );

        const promotionCreating = await this._promotionRepository.Create(promotion);

        return ResultService.ok<PromotionDTO>(this._promotionMap.transformToDTO(promotionCreating));
      }

      const result = await this._clodinaryUti.CreateMedia(
        promotionDTOValidateCreate.img,
        'img-shopee',
        360,
        360,
      );

      if (!result.createdSuccessfully)
        return ResultService.fail<PromotionDTO | null>(
          'Invalid media type. Only images and videos are supported.',
        );

      if (result.imgUrl === null || result.publicId === null)
        return ResultService.fail<PromotionDTO | null>('Error creating image on Cloudinary');

      const promotion = new Promotion(
        id,
        promotionDTOValidateCreate.whatIsThePromotion,
        promotionDTOValidateCreate.title,
        promotionDTOValidateCreate.description,
        parsedDate,
        result.imgUrl,
        promotionDTOValidateCreate.imgInnerFirst,
        null,
        promotionDTOValidateCreate.imgInnerSecond,
        null,
        promotionDTOValidateCreate.imgInnerThird,
        null,
      );

      const promotionCreating = await this._promotionRepository.Create(promotion);

      return ResultService.ok<PromotionDTO>(this._promotionMap.transformToDTO(promotionCreating));
    } catch (error) {
      return ResultService.fail<PromotionDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async DeletePromotion(promotionId: string): Promise<ResultService<PromotionDTO | null>> {
    try {
      const promotionDelete = await this._promotionRepository.GetById(promotionId);

      if (promotionDelete === null)
        return ResultService.fail<PromotionDTO | null>('Promotion not found');

      if (promotionDelete.whatIsThePromotion === 1) {
        const deleteFound = await this._clodinaryUti.DeleteFileCloudinaryExtractingPublicIdFromUrl(
          promotionDelete.img,
          'image',
        );

        if (!deleteFound.deleteSuccessfully)
          return ResultService.fail<PromotionDTO | null>(deleteFound.message);
      } else if (promotionDelete.whatIsThePromotion === 2) {
        const deleteFound = await this._clodinaryUti.DeleteFileCloudinaryExtractingPublicIdFromUrl(
          promotionDelete.img,
          'image',
        );

        if (!deleteFound.deleteSuccessfully)
          return ResultService.fail<PromotionDTO | null>(deleteFound.message);

        const deleteImgInnerFirst =
          await this._clodinaryUti.DeleteFileCloudinaryExtractingPublicIdFromUrl(
            promotionDelete.imgInnerFirst,
            'image',
          );

        if (!deleteImgInnerFirst.deleteSuccessfully)
          return ResultService.fail<PromotionDTO | null>(deleteImgInnerFirst.message);

        const deleteImgInnerSecond =
          await this._clodinaryUti.DeleteFileCloudinaryExtractingPublicIdFromUrl(
            promotionDelete.imgInnerSecond,
            'image',
          );

        if (!deleteImgInnerSecond.deleteSuccessfully)
          return ResultService.fail<PromotionDTO | null>(deleteImgInnerSecond.message);

        const deleteImgInnerThird =
          await this._clodinaryUti.DeleteFileCloudinaryExtractingPublicIdFromUrl(
            promotionDelete.imgInnerThird,
            'image',
          );

        if (!deleteImgInnerThird.deleteSuccessfully)
          return ResultService.fail<PromotionDTO | null>(deleteImgInnerThird.message);
      }

      const deletePromotion = await this._promotionUserService.Delete(promotionId);

      if (!deletePromotion.isSuccess)
        return ResultService.fail<PromotionDTO>(deletePromotion.message ?? 'error delete');

      const productDeleteSuccessfully = await this._promotionRepository.Delete(promotionDelete.id);

      return ResultService.ok<PromotionDTO>(
        this._promotionMap.transformToDTO(productDeleteSuccessfully),
      );
    } catch (error) {
      return ResultService.fail<PromotionDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  Delete(id: string): Promise<ResultService<PromotionDTO | null>> {
    throw new Error('Method not implemented.' + id);
  }
}

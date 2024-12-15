import { Injectable } from '@nestjs/common';
import { IProductDiscoveriesOfDayService } from './Interfaces/IProductDiscoveriesOfDayService';
import { IProductDiscoveriesOfDayRepository } from 'src/Shoope.Domain/Repositories/IProductDiscoveriesOfDayRepository';
import { ProductDiscoveriesOfDayDTO } from '../DTOs/ProductDiscoveriesOfDayDTO';
import { IProductDiscoveriesOfDayMap } from '../Mappings/IMappings/IProductDiscoveriesOfDayMap';
import { ResultService } from './ResultService';
import { IClodinaryUti } from 'src/Shoope.Infra.Data/UtilityExternal/Interface/IClodinaryUti';
import { ProductDiscoveriesOfDayDTOValidateCreate } from '../DTOs/Validations/ProductDiscoveriesOfDayDTOValidate/ProductDiscoveriesOfDayDTOValidateCreate';
import { v4 as uuidv4 } from 'uuid';
import { ProductDiscoveriesOfDay } from 'src/Shoope.Domain/Entities/ProductDiscoveriesOfDay';

@Injectable()
export class ProductDiscoveriesOfDayService implements IProductDiscoveriesOfDayService {
  constructor(
    private readonly _productDiscoveriesOfDayRepository: IProductDiscoveriesOfDayRepository,
    private readonly _productDiscoveriesOfDayMap: IProductDiscoveriesOfDayMap,
    private readonly _clodinaryUti: IClodinaryUti,
  ) {}

  async GetProductDiscoveriesOfDayById(
    productDiscoveriesOfDayId: string,
  ): Promise<ResultService<ProductDiscoveriesOfDayDTO | null>> {
    try {
      const productDiscoveriesOfDay =
        await this._productDiscoveriesOfDayRepository.GetProductDiscoveriesOfDayById(
          productDiscoveriesOfDayId,
        );

      if (!productDiscoveriesOfDay) {
        return ResultService.fail<ProductDiscoveriesOfDayDTO | null>('Address not found');
      }

      return ResultService.ok<ProductDiscoveriesOfDayDTO>(
        this._productDiscoveriesOfDayMap.transformToDTO(productDiscoveriesOfDay),
      );
    } catch (error) {
      return ResultService.fail<ProductDiscoveriesOfDayDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async GetAllProductDiscoveriesOfDays(): Promise<
    ResultService<ProductDiscoveriesOfDayDTO[] | null>
  > {
    try {
      const productDiscoveriesOfDayList =
        await this._productDiscoveriesOfDayRepository.GetAllProductDiscoveriesOfDay();

      if (!productDiscoveriesOfDayList) {
        return ResultService.fail<ProductDiscoveriesOfDayDTO[] | null>('Address not found');
      }

      return ResultService.ok<ProductDiscoveriesOfDayDTO[]>(
        this._productDiscoveriesOfDayMap.transformToDTOList(productDiscoveriesOfDayList),
      );
    } catch (error) {
      return ResultService.fail<ProductDiscoveriesOfDayDTO[] | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Create(
    productDiscoveriesOfDayDTOValidateCreate: ProductDiscoveriesOfDayDTOValidateCreate | null,
  ): Promise<ResultService<ProductDiscoveriesOfDayDTO | null>> {
    try {
      if (productDiscoveriesOfDayDTOValidateCreate === null)
        ResultService.fail<ProductDiscoveriesOfDayDTO | null>('DTO is null');

      const result = await this._clodinaryUti.CreateMedia(
        productDiscoveriesOfDayDTOValidateCreate.imgProduct,
        'product-discoveries-of-day',
        320,
        320,
      );

      if (!result.createdSuccessfully)
        return ResultService.fail<ProductDiscoveriesOfDayDTO | null>(
          'Invalid media type. Only images and videos are supported.',
        );

      if (result.imgUrl === null || result.publicId === null)
        return ResultService.fail<ProductDiscoveriesOfDayDTO | null>(
          'Error creating image on Cloudinary',
        );

      const id = uuidv4();
      const productDiscoveriesOfDay = new ProductDiscoveriesOfDay(
        id,
        productDiscoveriesOfDayDTOValidateCreate.title,
        result.imgUrl,
        productDiscoveriesOfDayDTOValidateCreate.imgPartBottom,
        productDiscoveriesOfDayDTOValidateCreate.discountPercentage,
        productDiscoveriesOfDayDTOValidateCreate.isAd,
        productDiscoveriesOfDayDTOValidateCreate.price,
        productDiscoveriesOfDayDTOValidateCreate.quantitySold,
      );

      const productDiscoveriesOfDayCreate =
        await this._productDiscoveriesOfDayRepository.Create(productDiscoveriesOfDay);

      return ResultService.ok<ProductDiscoveriesOfDayDTO>(
        this._productDiscoveriesOfDayMap.transformToDTO(productDiscoveriesOfDayCreate),
      );
    } catch (error) {
      return ResultService.fail<ProductDiscoveriesOfDayDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Delete(id: string): Promise<ResultService<ProductDiscoveriesOfDayDTO | null>> {
    try {
      const productDiscoveriesOfDayDelete =
        await this._productDiscoveriesOfDayRepository.CheckWheterItExistProductDiscoveriesOfDay(id);

      if (productDiscoveriesOfDayDelete === null)
        return ResultService.fail<ProductDiscoveriesOfDayDTO | null>(
          'ProductDiscoveriesOfDayDTO not found',
        );

      const deleteFound = await this._clodinaryUti.DeleteFileCloudinaryExtractingPublicIdFromUrl(
        productDiscoveriesOfDayDelete.imgProduct,
        'image',
      );

      if (!deleteFound.deleteSuccessfully)
        return ResultService.fail<ProductDiscoveriesOfDayDTO | null>(deleteFound.message);

      const userDeleteSuccessfully = await this._productDiscoveriesOfDayRepository.Delete(
        productDiscoveriesOfDayDelete.id,
      );

      return ResultService.ok<ProductDiscoveriesOfDayDTO>(
        this._productDiscoveriesOfDayMap.transformToDTO(userDeleteSuccessfully),
      );
    } catch (error) {
      return ResultService.fail<ProductDiscoveriesOfDayDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }
}

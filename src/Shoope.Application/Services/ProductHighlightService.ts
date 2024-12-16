import { v4 as uuidv4 } from 'uuid';
import { IProductHighlightService } from './Interfaces/IProductHighlightService';
import { Injectable } from '@nestjs/common';
import { IProductHighlightRepository } from 'src/Shoope.Domain/Repositories/IProductHighlightRepository';
import { ProductHighlightDTO } from '../DTOs/ProductHighlightDTO';
import { ResultService } from './ResultService';
import { IProductHighlightMap } from '../Mappings/IMappings/IProductHighlightMap';
import { IClodinaryUti } from 'src/Shoope.Infra.Data/UtilityExternal/Interface/IClodinaryUti';
import { ProductHighlightDTOValidateCreate } from '../DTOs/Validations/ProductHighlightDTOValidate/ProductHighlightDTOValidateCreate';
import { ProductHighlight } from 'src/Shoope.Domain/Entities/ProductHighlight';

@Injectable()
export class ProductHighlightService implements IProductHighlightService {
  constructor(
    private readonly _productHighlightRepository: IProductHighlightRepository,
    private readonly _productHighlightMap: IProductHighlightMap,
    private readonly _clodinaryUti: IClodinaryUti,
  ) {}

  async GetProductHighlightById(
    productHighlightId: string,
  ): Promise<ResultService<ProductHighlightDTO | null>> {
    try {
      const productHighlight =
        await this._productHighlightRepository.GetProductHighlightById(productHighlightId);

      if (!productHighlight) {
        return ResultService.fail<ProductHighlightDTO | null>('productHighlight not found');
      }

      return ResultService.ok<ProductHighlightDTO>(
        this._productHighlightMap.transformToDTO(productHighlight),
      );
    } catch (error) {
      return ResultService.fail<ProductHighlightDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async GetAllProductHighlights(): Promise<ResultService<ProductHighlightDTO[] | null>> {
    try {
      const productHighlightList = await this._productHighlightRepository.GetAllProductHighlight();

      if (!productHighlightList) {
        return ResultService.fail<ProductHighlightDTO[] | null>('productHighlightList not found');
      }

      return ResultService.ok<ProductHighlightDTO[]>(
        this._productHighlightMap.transformToDTOList(productHighlightList),
      );
    } catch (error) {
      return ResultService.fail<ProductHighlightDTO[] | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Create(
    productHighlightDTOValidateCreate: ProductHighlightDTOValidateCreate | null,
  ): Promise<ResultService<ProductHighlightDTO | null>> {
    try {
      if (productHighlightDTOValidateCreate === null)
        ResultService.fail<ProductHighlightDTO | null>('DTO is null');

      const result = await this._clodinaryUti.CreateMedia(
        productHighlightDTOValidateCreate.imgBase64,
        'product-highlights',
        500,
        500,
      );

      if (!result.createdSuccessfully)
        return ResultService.fail<ProductHighlightDTO | null>(
          'Invalid media type. Only images and videos are supported.',
        );

      if (result.imgUrl === null || result.publicId === null)
        return ResultService.fail<ProductHighlightDTO | null>('Error creating image on Cloudinary');

      const id = uuidv4();
      const productHighlight = new ProductHighlight(
        id,
        productHighlightDTOValidateCreate.title,
        result.imgUrl,
        productHighlightDTOValidateCreate.imgTop,
        productHighlightDTOValidateCreate.quantitySold,
      );

      const productHighlightCreated =
        await this._productHighlightRepository.Create(productHighlight);

      return ResultService.ok<ProductHighlightDTO>(
        this._productHighlightMap.transformToDTO(productHighlightCreated),
      );
    } catch (error) {
      return ResultService.fail<ProductHighlightDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Delete(id: string): Promise<ResultService<ProductHighlightDTO | null>> {
    try {
      const productHighlightDTODelete =
        await this._productHighlightRepository.GetProductHighlightById(id);

      if (productHighlightDTODelete === null)
        return ResultService.fail<ProductHighlightDTO | null>('productHighlight not found');

      const deleteFound = await this._clodinaryUti.DeleteFileCloudinaryExtractingPublicIdFromUrl(
        productHighlightDTODelete.imgProduct,
        'image',
      );

      if (!deleteFound.deleteSuccessfully)
        return ResultService.fail<ProductHighlightDTO | null>(deleteFound.message);

      const productHighlightDeleteSuccessfully = await this._productHighlightRepository.Delete(
        productHighlightDTODelete.id,
      );

      return ResultService.ok<ProductHighlightDTO>(
        this._productHighlightMap.transformToDTO(productHighlightDeleteSuccessfully),
      );
    } catch (error) {
      return ResultService.fail<ProductHighlightDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }
}

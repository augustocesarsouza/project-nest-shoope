import { Injectable } from '@nestjs/common';
import { IProductDescriptionService } from './Interfaces/IProductDescriptionService';
import { IProductDescriptionRepository } from 'src/Shoope.Domain/Repositories/IProductDescriptionRepository';
import { IProductDescriptionMap } from '../Mappings/IMappings/IProductDescriptionMap';
import { ProductDescriptionDTO } from '../DTOs/ProductDescriptionDTO';
import { ResultService } from './ResultService';
import { v4 as uuidv4 } from 'uuid';
import { ProductDescription } from 'src/Shoope.Domain/Entities/ProductDescription';
import { ProductDescriptionDTOValidateCreate } from '../DTOs/Validations/ProductDescriptionDTOValidate/ProductDescriptionDTOValidateCreate';

@Injectable()
export class ProductDescriptionService implements IProductDescriptionService {
  constructor(
    private readonly _productDescriptionRepository: IProductDescriptionRepository,
    private readonly _productDescriptionMap: IProductDescriptionMap,
  ) {}

  async GetProductDescriptionByProductId(
    productId: string,
  ): Promise<ResultService<ProductDescriptionDTO | null>> {
    try {
      const product =
        await this._productDescriptionRepository.GetProductDescriptionByProductId(productId);

      if (!product) {
        return ResultService.fail<ProductDescriptionDTO | null>('product not found');
      }

      return ResultService.ok<ProductDescriptionDTO | null>(
        this._productDescriptionMap.transformToDTO(product),
      );
    } catch (error) {
      return ResultService.fail<ProductDescriptionDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Create(
    productDescriptionDTOValidateCreate: ProductDescriptionDTOValidateCreate | null,
  ): Promise<ResultService<ProductDescriptionDTO | null>> {
    try {
      if (productDescriptionDTOValidateCreate === null)
        return ResultService.fail<ProductDescriptionDTO | null>('DTO Is null');

      const id = uuidv4();

      const likeReviewCreate = await this._productDescriptionRepository.Create(
        new ProductDescription(
          id,
          productDescriptionDTOValidateCreate.description,
          productDescriptionDTOValidateCreate.characteristics,
          productDescriptionDTOValidateCreate.productId,
        ),
      );

      return ResultService.ok<ProductDescriptionDTO>(
        this._productDescriptionMap.transformToDTO(likeReviewCreate),
      );
    } catch (error) {
      return ResultService.fail<ProductDescriptionDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Delete(id: string): Promise<ResultService<ProductDescriptionDTO | null>> {
    try {
      const entityForDelete =
        await this._productDescriptionRepository.CheckWhetherItExistOrNotRegisterByProductId(id);

      if (entityForDelete === null)
        return ResultService.fail<ProductDescriptionDTO | null>('entity not found');

      const entityDeleteSuccessfully = await this._productDescriptionRepository.Delete(id);

      return ResultService.ok<ProductDescriptionDTO>(
        this._productDescriptionMap.transformToDTO(entityDeleteSuccessfully),
      );
    } catch (error) {
      return ResultService.fail<ProductDescriptionDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }
}

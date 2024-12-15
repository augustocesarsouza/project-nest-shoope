import { Injectable } from '@nestjs/common';
import { IProductDetailService } from './Interfaces/IProductDetailService';
import { IProductDetailRepository } from 'src/Shoope.Domain/Repositories/IProductDetailRepository';
import { ResultService } from './ResultService';
import { IProductDetailMap } from '../Mappings/IMappings/IProductDetailMap';
import { ProductDetailDTO } from '../DTOs/ProductDetailDTO';
import { ProductDetail } from 'src/Shoope.Domain/Entities/ProductDetail';
import { ProductDetailDTOValidateCreate } from '../DTOs/Validations/ProductDetailDTOValidate/ProductDetailDTOValidateCreate';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductDetailService implements IProductDetailService {
  constructor(
    private readonly _productDetailRepository: IProductDetailRepository,
    private readonly _productDetailMap: IProductDetailMap,
  ) {}

  async GetProductDetailByProductId(
    productId: string,
  ): Promise<ResultService<ProductDetailDTO | null>> {
    try {
      const productDetail =
        await this._productDetailRepository.GetProductDetailByProductId(productId);

      if (!productDetail) {
        return ResultService.fail<ProductDetailDTO | null>('Address not found');
      }

      return ResultService.ok<ProductDetailDTO>(
        this._productDetailMap.transformToDTO(productDetail),
      );
    } catch (error) {
      return ResultService.fail<ProductDetailDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Create(
    productDetailDTOValidateCreate: ProductDetailDTOValidateCreate | null,
  ): Promise<ResultService<ProductDetailDTO | null>> {
    try {
      if (productDetailDTOValidateCreate === null)
        return ResultService.fail<ProductDetailDTO | null>('DTO Is null');

      const id = uuidv4();

      const productDetailCreate = await this._productDetailRepository.Create(
        new ProductDetail(
          id,
          productDetailDTOValidateCreate.promotionalStock,
          productDetailDTOValidateCreate.totalStock,
          productDetailDTOValidateCreate.sendingOf,
          productDetailDTOValidateCreate.mark,
          productDetailDTOValidateCreate.gender,
          productDetailDTOValidateCreate.warrantlyDuration,
          productDetailDTOValidateCreate.warrantlyType,
          productDetailDTOValidateCreate.productWeight,
          productDetailDTOValidateCreate.energyConsumption,
          productDetailDTOValidateCreate.amount,
          productDetailDTOValidateCreate.material,
          productDetailDTOValidateCreate.productId,
        ),
      );

      return ResultService.ok<ProductDetailDTO>(
        this._productDetailMap.transformToDTO(productDetailCreate),
      );
    } catch (error) {
      return ResultService.fail<ProductDetailDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Delete(id: string): Promise<ResultService<ProductDetailDTO | null>> {
    try {
      const productDetailForDelete =
        await this._productDetailRepository.CheckWheterItExistProductDetail(id);

      if (productDetailForDelete === null)
        return ResultService.fail<ProductDetailDTO | null>('ProductDetail not found');

      const categoryDeleteSuccessfully = await this._productDetailRepository.Delete(id);

      return ResultService.ok<ProductDetailDTO>(
        this._productDetailMap.transformToDTO(categoryDeleteSuccessfully),
      );
    } catch (error) {
      return ResultService.fail<ProductDetailDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }
}

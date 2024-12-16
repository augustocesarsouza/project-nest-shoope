import { Injectable } from '@nestjs/common';
import { IProductSellerService } from './Interfaces/IProductSellerService';
import { ProductSellerDTO } from '../DTOs/ProductSellerDTO';
import { ResultService } from './ResultService';
import { ProductSellerDTOValidateCreate } from '../DTOs/Validations/ProductSellerDTOValidate/ProductSellerDTOValidateCreate';
import { ProductSeller } from 'src/Shoope.Domain/Entities/ProductSeller';
import { IProductSellerRepository } from 'src/Shoope.Domain/Repositories/IProductSellerRepository';
import { IProductSellerMap } from '../Mappings/IMappings/IProductSellerMap';
import { v4 as uuidv4 } from 'uuid';
import { UserSellerProduct } from 'src/Shoope.Domain/Entities/UserSellerProduct';

@Injectable()
export class ProductSellerService implements IProductSellerService {
  constructor(
    private readonly _productSellerRepository: IProductSellerRepository,
    private readonly _productSellerMap: IProductSellerMap,
  ) {}

  async GetById(productId: string): Promise<ResultService<ProductSellerDTO | null>> {
    try {
      const productSeller = await this._productSellerRepository.GetById(productId);

      if (!productSeller) {
        return ResultService.fail<ProductSellerDTO | null>('Address not found');
      }

      const productSellerMap = this._productSellerMap.transformToDTO(productSeller);

      return ResultService.ok<ProductSellerDTO>(productSellerMap);
    } catch (error) {
      return ResultService.fail<ProductSellerDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Create(
    productSellerDTOValidateCreate: ProductSellerDTOValidateCreate | null,
  ): Promise<ResultService<ProductSellerDTO | null>> {
    try {
      if (productSellerDTOValidateCreate === null)
        ResultService.fail<ProductSellerDTO | null>('DTO is null');

      const id = uuidv4();
      const productSeller = new ProductSeller(
        id,
        productSellerDTOValidateCreate.userSellerProductId,
        null,
        productSellerDTOValidateCreate.productId,
      );

      const productSellerCreated = await this._productSellerRepository.Create(productSeller);

      return ResultService.ok<ProductSellerDTO>(
        this._productSellerMap.transformToDTO(productSellerCreated),
      );
    } catch (error) {
      return ResultService.fail<ProductSellerDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Delete(id: string): Promise<ResultService<ProductSellerDTO | null>> {
    try {
      // const productSeller = await this._productSellerRepository.GetById(id);
      const productSeller = await this._productSellerRepository.CheckIfExistRegisterById(id);

      if (productSeller === null)
        return ResultService.fail<ProductSellerDTO | null>('productOptionImage not found');

      const productSellerDeleteSuccessfully = await this._productSellerRepository.Delete(
        productSeller.id,
      );

      return ResultService.ok<ProductSellerDTO>(
        this._productSellerMap.transformToDTO(productSellerDeleteSuccessfully),
      );
    } catch (error) {
      return ResultService.fail<ProductSellerDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async DeleteByUserSellerProductId(
    userSellerProduct: UserSellerProduct,
  ): Promise<ResultService<ProductSellerDTO | null>> {
    try {
      const productSeller =
        await this._productSellerRepository.CheckIfExistRegisterByUserSellerProductId(
          userSellerProduct.id,
        );

      if (productSeller === null)
        return ResultService.fail<ProductSellerDTO | null>('productOptionImage not found');

      const productSellerDeleteSuccessfully = await this._productSellerRepository.Delete(
        productSeller.id,
      );

      return ResultService.ok<ProductSellerDTO>(
        this._productSellerMap.transformToDTO(productSellerDeleteSuccessfully),
      );
    } catch (error) {
      return ResultService.fail<ProductSellerDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }
}

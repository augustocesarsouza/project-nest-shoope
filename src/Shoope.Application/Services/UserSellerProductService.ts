import { Injectable } from '@nestjs/common';
import { IUserSellerProductService } from './Interfaces/IUserSellerProductService';
import { UserSellerProductDTO } from '../DTOs/UserSellerProductDTO';
import { ResultService } from './ResultService';
import { IUserSellerProductRepository } from 'src/Shoope.Domain/Repositories/IUserSellerProductRepository';
import { IUserSellerProductMap } from '../Mappings/IMappings/IUserSellerProductMap';
import { UserSellerProductDTOValidateCreate } from '../DTOs/Validations/UserSellerProductDTOValidate/UserSellerProductDTOValidateCreate';
import { UserSellerProduct } from 'src/Shoope.Domain/Entities/UserSellerProduct';
import { v4 as uuidv4 } from 'uuid';
import { IClodinaryUti } from 'src/Shoope.Infra.Data/UtilityExternal/Interface/IClodinaryUti';
import { IProductSellerService } from './Interfaces/IProductSellerService';

@Injectable()
export class UserSellerProductService implements IUserSellerProductService {
  constructor(
    private readonly _userSellerProductRepository: IUserSellerProductRepository,
    private readonly _userSellerProductMap: IUserSellerProductMap,
    private readonly _clodinaryUti: IClodinaryUti,
    private readonly _productSellerService: IProductSellerService,
  ) {}

  async GetById(userSellerProductId: string): Promise<ResultService<UserSellerProductDTO | null>> {
    try {
      const userSellerProduct =
        await this._userSellerProductRepository.GetById(userSellerProductId);

      if (!userSellerProduct) {
        return ResultService.fail<UserSellerProductDTO | null>('userSellerProduct not found');
      }

      return ResultService.ok<UserSellerProductDTO>(
        this._userSellerProductMap.transformToDTO(userSellerProduct),
      );
    } catch (error) {
      return ResultService.fail<UserSellerProductDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Create(
    userSellerProductDTOValidateCreate: UserSellerProductDTOValidateCreate | null,
  ): Promise<ResultService<UserSellerProductDTO | null>> {
    try {
      if (userSellerProductDTOValidateCreate === null)
        ResultService.fail<UserSellerProductDTO | null>('DTO is null');

      const id = uuidv4();
      const creationDate = new Date(); // isso aqui está no "UTC"
      const userSellerProduct = new UserSellerProduct(
        id,
        userSellerProductDTOValidateCreate.name,
        null,
        userSellerProductDTOValidateCreate.imgFloating,
        creationDate,
        userSellerProductDTOValidateCreate.reviews,
        userSellerProductDTOValidateCreate.chatResponseRate,
        creationDate,
        userSellerProductDTOValidateCreate.quantityOfProductSold,
        userSellerProductDTOValidateCreate.usuallyRespondsToChatIn,
        userSellerProductDTOValidateCreate.followers,
      );

      const result = await this._clodinaryUti.CreateMedia(
        userSellerProductDTOValidateCreate.imgPerfilBase64,
        'img-user-seller',
        80,
        80,
      );

      if (!result.createdSuccessfully)
        return ResultService.fail<UserSellerProductDTO | null>(
          'Invalid media type. Only images and videos are supported.',
        );

      if (result.imgUrl === null || result.publicId === null)
        return ResultService.fail<UserSellerProductDTO | null>(
          'Error creating image on Cloudinary',
        );

      userSellerProduct.imgPerfil = result.imgUrl;

      if (userSellerProductDTOValidateCreate.imgFloatingBase64 !== null) {
        const resultImgFloating = await this._clodinaryUti.CreateMedia(
          userSellerProductDTOValidateCreate.imgFloatingBase64,
          'img-user-seller',
          197,
          48,
        );

        if (!resultImgFloating.createdSuccessfully)
          return ResultService.fail<UserSellerProductDTO | null>(
            'Invalid media type. Only images and videos are supported.',
          );

        if (resultImgFloating.imgUrl === null || resultImgFloating.publicId === null)
          return ResultService.fail<UserSellerProductDTO | null>('error when create ImgFloating');

        userSellerProduct.imgFloating = resultImgFloating.imgUrl;
      }

      const userSellerProductCreated =
        await this._userSellerProductRepository.Create(userSellerProduct);

      return ResultService.ok<UserSellerProductDTO>(
        this._userSellerProductMap.transformToDTO(userSellerProductCreated),
      );
    } catch (error) {
      return ResultService.fail<UserSellerProductDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Delete(id: string): Promise<ResultService<UserSellerProductDTO | null>> {
    try {
      const userSellerProduct =
        await this._userSellerProductRepository.CheckIfExistRegisterById(id);

      if (userSellerProduct === null)
        return ResultService.fail<UserSellerProductDTO | null>('productOptionImage not found');

      const deleteFound = await this._clodinaryUti.DeleteFileCloudinaryExtractingPublicIdFromUrl(
        userSellerProduct.imgPerfil,
        'image',
      );

      if (!deleteFound.deleteSuccessfully)
        return ResultService.fail<UserSellerProductDTO | null>(deleteFound.message);

      await this._productSellerService.DeleteByUserSellerProductId(userSellerProduct);

      const productSellerDeleteSuccessfully = await this._userSellerProductRepository.Delete(
        userSellerProduct.id,
      );

      return ResultService.ok<UserSellerProductDTO>(
        this._userSellerProductMap.transformToDTO(productSellerDeleteSuccessfully),
      );
    } catch (error) {
      return ResultService.fail<UserSellerProductDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }
}

import { Module } from '@nestjs/common';
import { IUserManagementService } from './Services/Interfaces/IUserManagementService';
import { UserManagementService } from './Services/UserManagementService';
import { IUserCreateAccountFunction } from './Services/Interfaces/IUserCreateAccountFunction';
import { UserCreateAccountFunction } from './Services/UserCreateAccountFunction';
import { IUserMap } from './Mappings/IMappings/IUserMap';
import { UserMap } from './Mappings/UserMap';
import { RepositoriesModule } from 'src/Shoope.Infra.Data/RepositoriesModule';
import { IClodinaryUti } from 'src/Shoope.Infra.Data/UtilityExternal/Interface/IClodinaryUti';
import { ClodinaryUti } from 'src/Shoope.Infra.Data/UtilityExternal/ClodinaryUti';
import { ConfigModule } from '@nestjs/config';
import { IUserAuthenticationService } from './Services/Interfaces/IUserAuthenticationService';
import { UserAuthenticationService } from './Services/UserAuthenticationService';
import { TokenGeneratorUser } from 'src/Shoope.Infra.Data/Authentication/TokenGeneratorUser';
import { ITokenGeneratorUser } from 'src/Shoope.Domain/Authentication/ITokenGeneratorUser';
import { CodeRandomDictionary } from './CodeRandomUser/CodeRandomDictionary';
import { IAddressService } from './Services/Interfaces/IAddressService';
import { AddressService } from './Services/AddressService';
import { IAddressMap } from './Mappings/IMappings/IAddressMap';
import { AddressMap } from './Mappings/AddressMap';
import { CategoryService } from './Services/CategoryService';
import { ICategoryService } from './Services/Interfaces/ICategoryService';
import { ICategoryMap } from './Mappings/IMappings/ICategoryMap';
import { CategoryMap } from './Mappings/CategoryMap';
import { ICuponMap } from './Mappings/IMappings/ICuponMap';
import { CuponMap } from './Mappings/CuponMap';
import { ICuponService } from './Services/Interfaces/ICuponService';
import { CuponService } from './Services/CuponService';
import { IProductsOfferFlashService } from './Services/Interfaces/IProductsOfferFlashService';
import { ProductsOfferFlashService } from './Services/ProductsOfferFlashService';
import { IProductsOfferFlashMap } from './Mappings/IMappings/IProductsOfferFlashMap';
import { ProductsOfferFlashMap } from './Mappings/ProductsOfferFlashMap';
import { IFlashSaleProductAllInfoService } from './Services/Interfaces/IFlashSaleProductAllInfoService';
import { FlashSaleProductAllInfoService } from './Services/FlashSaleProductAllInfoService';
import { IFlashSaleProductAllInfoMap } from './Mappings/IMappings/IFlashSaleProductAllInfoMap';
import { FlashSaleProductAllInfoMap } from './Mappings/FlashSaleProductAllInfoMap';
import { ILikeReviewService } from './Services/Interfaces/ILikeReviewService';
import { LikeReviewService } from './Services/LikeReviewService';
import { ILikeReviewMap } from './Mappings/IMappings/ILikeReviewMap';
import { LikeReviewMap } from './Mappings/LikeReviewMap';
import { IProductDescriptionService } from './Services/Interfaces/IProductDescriptionService';
import { ProductDescriptionService } from './Services/ProductDescriptionService';
import { IProductDescriptionMap } from './Mappings/IMappings/IProductDescriptionMap';
import { ProductDescriptionMap } from './Mappings/ProductDescriptionMap';
import { IProductDetailService } from './Services/Interfaces/IProductDetailService';
import { ProductDetailService } from './Services/ProductDetailService';
import { IProductDetailMap } from './Mappings/IMappings/IProductDetailMap';
import { IProductDiscoveriesOfDayMap } from './Mappings/IMappings/IProductDiscoveriesOfDayMap';
import { ProductDiscoveriesOfDayMap } from './Mappings/ProductDiscoveriesOfDayMap';
import { ProductDetailMap } from './Mappings/ProductDetailMap';
import { IProductDiscoveriesOfDayService } from './Services/Interfaces/IProductDiscoveriesOfDayService';
import { ProductDiscoveriesOfDayService } from './Services/ProductDiscoveriesOfDayService';

@Module({
  imports: [RepositoriesModule, ConfigModule],
  providers: [
    CodeRandomDictionary,
    {
      provide: IUserManagementService,
      useClass: UserManagementService,
    },
    {
      provide: IUserAuthenticationService,
      useClass: UserAuthenticationService,
    },
    {
      provide: IAddressService,
      useClass: AddressService,
    },
    {
      provide: ICategoryService,
      useClass: CategoryService,
    },
    {
      provide: ICuponService,
      useClass: CuponService,
    },
    {
      provide: IProductsOfferFlashService,
      useClass: ProductsOfferFlashService,
    },
    {
      provide: IFlashSaleProductAllInfoService,
      useClass: FlashSaleProductAllInfoService,
    },
    {
      provide: IUserCreateAccountFunction,
      useClass: UserCreateAccountFunction,
    },
    {
      provide: ILikeReviewService,
      useClass: LikeReviewService,
    },
    {
      provide: IProductDiscoveriesOfDayService,
      useClass: ProductDiscoveriesOfDayService,
    },
    {
      provide: IProductDescriptionService,
      useClass: ProductDescriptionService,
    },
    {
      provide: IProductDetailService,
      useClass: ProductDetailService,
    },
    {
      provide: IUserMap,
      useClass: UserMap,
    },
    {
      provide: IAddressMap,
      useClass: AddressMap,
    },
    {
      provide: ICategoryMap,
      useClass: CategoryMap,
    },
    {
      provide: ICuponMap,
      useClass: CuponMap,
    },
    {
      provide: ILikeReviewMap,
      useClass: LikeReviewMap,
    },
    {
      provide: IProductDetailMap,
      useClass: ProductDetailMap,
    },
    {
      provide: IProductDescriptionMap,
      useClass: ProductDescriptionMap,
    },
    {
      provide: IFlashSaleProductAllInfoMap,
      useClass: FlashSaleProductAllInfoMap,
    },
    {
      provide: IProductsOfferFlashMap,
      useClass: ProductsOfferFlashMap,
    },
    {
      provide: IProductDiscoveriesOfDayMap,
      useClass: ProductDiscoveriesOfDayMap,
    },

    {
      provide: IClodinaryUti,
      useClass: ClodinaryUti,
    },
    {
      provide: ITokenGeneratorUser,
      useClass: TokenGeneratorUser,
    },
  ],
  exports: [
    IUserManagementService,
    IUserAuthenticationService,
    IUserCreateAccountFunction,
    ICategoryService,
    ICuponService,
    IProductsOfferFlashService,
    ILikeReviewService,
    IProductDiscoveriesOfDayService,
    IUserMap,
    IAddressMap,
    ICategoryMap,
    ICuponMap,
    ILikeReviewMap,
    IProductDetailMap,
    IProductDescriptionMap,
    IFlashSaleProductAllInfoMap,
    IProductsOfferFlashMap,
    IProductDiscoveriesOfDayMap,
    IClodinaryUti,
    ITokenGeneratorUser,
    IAddressService,
    IFlashSaleProductAllInfoService,
    IProductDescriptionService,
    IProductDetailService,
    // Exporte outros repositórios aqui, caso necessário
  ],
})
export class ApplicationModule {}

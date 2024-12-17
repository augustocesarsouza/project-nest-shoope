import { Module } from '@nestjs/common';
import { IUserRepository } from 'src/Shoope.Domain/Repositories/IUserRepository';
import { UserRepository } from './Repositories/UserRepository';
import { PrismaService } from './Context/Database/PrismaService';
import { IAddressRepository } from 'src/Shoope.Domain/Repositories/IAddressRepository';
import { AddressRepository } from './Repositories/AddressRepository';
import { ISendEmailBrevo } from './UtilityExternal/Interface/ISendEmailBrevo';
import { SendEmailBrevo } from './UtilityExternal/SendEmailBrevo';
import { ISendEmailUser } from './SendEmailUser/Interface/ISendEmailUser';
import { SendEmailUser } from './SendEmailUser/SendEmailUser';
import { ConfigModule } from '@nestjs/config';
import { ICategoryRepository } from 'src/Shoope.Domain/Repositories/ICategoryRepository';
import { CategoryRepository } from './Repositories/CategoryRepository';
import { ICuponRepository } from 'src/Shoope.Domain/Repositories/ICuponRepository';
import { CuponRepository } from './Repositories/CuponRepository';
import { IProductsOfferFlashRepository } from 'src/Shoope.Domain/Repositories/IProductsOfferFlashRepository';
import { ProductsOfferFlashRepository } from './Repositories/ProductsOfferFlashRepository';
import { IFlashSaleProductAllInfoRepository } from 'src/Shoope.Domain/Repositories/IFlashSaleProductAllInfo';
import { FlashSaleProductAllInfoRepository } from './Repositories/FlashSaleProductAllInfoRepository';
import { ILikeReviewRepository } from 'src/Shoope.Domain/Repositories/ILikeReviewRepository';
import { LikeReviewRepository } from './Repositories/LikeReviewRepository';
import { IProductDescriptionRepository } from 'src/Shoope.Domain/Repositories/IProductDescriptionRepository';
import { ProductDescriptionRepository } from './Repositories/ProductDescriptionRepository';
import { IProductDetailRepository } from 'src/Shoope.Domain/Repositories/IProductDetailRepository';
import { ProductDetailRepository } from './Repositories/ProductDetailRepository';
import { IProductDiscoveriesOfDayRepository } from 'src/Shoope.Domain/Repositories/IProductDiscoveriesOfDayRepository';
import { ProductDiscoveriesOfDayRepository } from './Repositories/ProductDiscoveriesOfDayRepository';
import { IProductFlashSaleReviewsRepository } from 'src/Shoope.Domain/Repositories/IProductFlashSaleReviewsRepository';
import { ProductFlashSaleReviewsRepository } from './Repositories/ProductFlashSaleReviewsRepository';
import { IProductHighlightRepository } from 'src/Shoope.Domain/Repositories/IProductHighlightRepository';
import { ProductHighlightRepository } from './Repositories/ProductHighlightRepository';
import { IProductOptionImageRepository } from 'src/Shoope.Domain/Repositories/IProductOptionImageRepository';
import { ProductOptionImageRepository } from './Repositories/ProductOptionImageRepository';
import { IProductSellerRepository } from 'src/Shoope.Domain/Repositories/IProductSellerRepository';
import { ProductSellerRepository } from './Repositories/ProductSellerRepository';
import { IUserSellerProductRepository } from 'src/Shoope.Domain/Repositories/IUserSellerProductRepository';
import { UserSellerProductRepository } from './Repositories/UserSellerProductRepository';
import { IPromotionRepository } from 'src/Shoope.Domain/Repositories/IPromotionRepository';
import { PromotionRepository } from './Repositories/PromotionRepository';
import { IPromotionUserRepository } from 'src/Shoope.Domain/Repositories/IPromotionUserRepository';
import { PromotionUserRepository } from './Repositories/PromotionUserRepository';
import { UserCuponRepository } from './Repositories/UserCuponRepository';
import { IUserCuponRepository } from 'src/Shoope.Domain/Repositories/IUserCuponRepository';

@Module({
  imports: [ConfigModule],
  providers: [
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IAddressRepository,
      useClass: AddressRepository,
    },
    {
      provide: ICategoryRepository,
      useClass: CategoryRepository,
    },
    {
      provide: ICuponRepository,
      useClass: CuponRepository,
    },
    {
      provide: IProductsOfferFlashRepository,
      useClass: ProductsOfferFlashRepository,
    },
    {
      provide: IProductDetailRepository,
      useClass: ProductDetailRepository,
    },
    {
      provide: IProductDiscoveriesOfDayRepository,
      useClass: ProductDiscoveriesOfDayRepository,
    },
    {
      provide: IFlashSaleProductAllInfoRepository,
      useClass: FlashSaleProductAllInfoRepository,
    },
    {
      provide: ILikeReviewRepository,
      useClass: LikeReviewRepository,
    },
    {
      provide: IProductDescriptionRepository,
      useClass: ProductDescriptionRepository,
    },
    {
      provide: IProductFlashSaleReviewsRepository,
      useClass: ProductFlashSaleReviewsRepository,
    },
    {
      provide: IProductHighlightRepository,
      useClass: ProductHighlightRepository,
    },
    {
      provide: IProductOptionImageRepository,
      useClass: ProductOptionImageRepository,
    },
    {
      provide: IProductSellerRepository,
      useClass: ProductSellerRepository,
    },
    {
      provide: IUserSellerProductRepository,
      useClass: UserSellerProductRepository,
    },
    {
      provide: IPromotionRepository,
      useClass: PromotionRepository,
    },
    {
      provide: IPromotionUserRepository,
      useClass: PromotionUserRepository,
    },
    {
      provide: IUserCuponRepository,
      useClass: UserCuponRepository,
    },
    {
      provide: ISendEmailBrevo,
      useClass: SendEmailBrevo,
    },
    {
      provide: ISendEmailUser,
      useClass: SendEmailUser,
    },
  ],
  exports: [
    IUserRepository,
    IAddressRepository,
    ICategoryRepository,
    ICuponRepository,
    IProductsOfferFlashRepository,
    ISendEmailBrevo,
    ISendEmailUser,
    IFlashSaleProductAllInfoRepository,
    ILikeReviewRepository,
    IProductDescriptionRepository,
    IProductDetailRepository,
    IProductDiscoveriesOfDayRepository,
    IProductFlashSaleReviewsRepository,
    IProductHighlightRepository,
    IProductOptionImageRepository,
    IUserSellerProductRepository,
    IProductSellerRepository,
    IPromotionRepository,
    IPromotionUserRepository,
    IUserCuponRepository,
  ],
})
export class RepositoriesModule {}

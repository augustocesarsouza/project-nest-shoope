import { Module } from '@nestjs/common';
import { UserController } from './Shoope.Api/Controllers/UserController';
import { PrismaService } from './Shoope.Infra.Data/Context/Database/PrismaService';
import { ApplicationModule } from './Shoope.Application/ApplicationModule';
import { ConfigModule } from '@nestjs/config';
import { AddressController } from './Shoope.Api/Controllers/AddressController';
import { CategoryController } from './Shoope.Api/Controllers/CategoryController';
import { CuponController } from './Shoope.Api/Controllers/CuponController';
import { ProductsOfferFlashServiceController } from './Shoope.Api/Controllers/ProductsOfferFlashServiceController';
import { FlashSaleProductAllInfoController } from './Shoope.Api/Controllers/FlashSaleProductAllInfoController';
import { LikeReviewController } from './Shoope.Api/Controllers/LikeReviewController';
import { ProductDescriptionController } from './Shoope.Api/Controllers/ProductDescriptionController';
import { ProductDetailController } from './Shoope.Api/Controllers/ProductDetailController';
import { ProductDiscoveriesOfDayController } from './Shoope.Api/Controllers/ProductDiscoveriesOfDayController';
import { ProductFlashSaleReviewsController } from './Shoope.Api/Controllers/ProductFlashSaleReviewsController';
import { ProductHighlightController } from './Shoope.Api/Controllers/ProductHighlightController';
import { ProductOptionImageController } from './Shoope.Api/Controllers/ProductOptionImageController';
import { ProductSellerController } from './Shoope.Api/Controllers/ProductSellerController';
import { UserSellerProductController } from './Shoope.Api/Controllers/UserSellerProductController';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigService disponível globalmente
    }),
    ApplicationModule,
  ],
  controllers: [
    UserController,
    AddressController,
    CategoryController,
    CuponController,
    ProductsOfferFlashServiceController,
    FlashSaleProductAllInfoController,
    LikeReviewController,
    ProductDescriptionController,
    ProductDetailController,
    ProductDiscoveriesOfDayController,
    ProductFlashSaleReviewsController,
    ProductHighlightController,
    ProductOptionImageController,
    ProductSellerController,
    UserSellerProductController,
  ],
  providers: [PrismaService],
})
export class AppModule {}

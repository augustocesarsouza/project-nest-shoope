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
  ],
  providers: [PrismaService],
})
export class AppModule {}

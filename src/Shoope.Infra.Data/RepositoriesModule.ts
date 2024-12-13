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
      provide: IFlashSaleProductAllInfoRepository,
      useClass: FlashSaleProductAllInfoRepository,
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
    // Exporte outros repositórios aqui, caso necessário
  ],
})
export class RepositoriesModule {}

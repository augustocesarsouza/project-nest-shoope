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
    ISendEmailBrevo,
    ISendEmailUser,
    // Exporte outros repositórios aqui, caso necessário
  ],
})
export class RepositoriesModule {}

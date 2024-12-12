import { Module } from '@nestjs/common';
import { UserController } from './Shoope.Api/Controllers/UserController';
import { PrismaService } from './Shoope.Infra.Data/Context/Database/PrismaService';
import { ApplicationModule } from './Shoope.Application/ApplicationModule';
import { ConfigModule } from '@nestjs/config';
import { AddressController } from './Shoope.Api/Controllers/AddressController';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigService disponível globalmente
    }),
    ApplicationModule,
  ],
  controllers: [UserController, AddressController],
  providers: [PrismaService],
})
export class AppModule {}

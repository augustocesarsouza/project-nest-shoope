import { Module } from '@nestjs/common';
import { UserController } from './Shoope.Api/Controllers/UserController';
import { PrismaService } from './Shoope.Infra.Data/Context/Database/PrismaService';
import { ApplicationModule } from './Shoope.Application/ApplicationModule';

@Module({
  imports: [ApplicationModule],
  controllers: [UserController],
  providers: [PrismaService],
})
export class AppModule {}

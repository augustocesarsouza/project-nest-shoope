import { Module } from '@nestjs/common';
import { UserController } from './Shoope.Api/Controllers/UserController';
import { PrismaService } from './Shoope.Infra.Data/Context/Database/PrismaService';
import { IBaseController } from './Shoope.Api/ControllersInterfaces/IBaseController';
import { BaseController } from './Shoope.Api/Controllers/BaseController';
import { ICurrentUser } from './Shoope.Domain/Authentication/ICurrentUser';
import { ApplicationModule } from './Shoope.Application/ApplicationModule';

@Module({
  imports: [ApplicationModule],
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: IBaseController,
      useClass: BaseController,
    },
    {
      provide: ICurrentUser,
      useClass: ICurrentUser,
    },
  ],
})
export class AppModule {}

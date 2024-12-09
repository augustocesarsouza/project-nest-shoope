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

@Module({
  imports: [RepositoriesModule, ConfigModule.forRoot()],
  providers: [
    {
      provide: IUserManagementService,
      useClass: UserManagementService,
    },
    {
      provide: IUserCreateAccountFunction,
      useClass: UserCreateAccountFunction,
    },
    {
      provide: IUserMap,
      useClass: UserMap,
    },
    {
      provide: IClodinaryUti,
      useClass: ClodinaryUti,
    },
  ],
  exports: [
    IUserManagementService,
    IUserCreateAccountFunction,
    IUserMap,
    IClodinaryUti,
    // Exporte outros repositórios aqui, caso necessário
  ],
})
export class ApplicationModule {}

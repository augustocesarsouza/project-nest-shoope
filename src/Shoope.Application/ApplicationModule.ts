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

@Module({
  imports: [RepositoriesModule, ConfigModule.forRoot()],
  providers: [
    {
      provide: IUserManagementService,
      useClass: UserManagementService,
    },
    {
      provide: IUserAuthenticationService,
      useClass: UserAuthenticationService,
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
    {
      provide: ITokenGeneratorUser,
      useClass: TokenGeneratorUser,
    },
  ],
  exports: [
    IUserManagementService,
    IUserAuthenticationService,
    IUserCreateAccountFunction,
    IUserMap,
    IClodinaryUti,
    ITokenGeneratorUser,
    // Exporte outros repositórios aqui, caso necessário
  ],
})
export class ApplicationModule {}

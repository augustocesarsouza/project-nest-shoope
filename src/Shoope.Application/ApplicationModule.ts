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
import { CodeRandomDictionary } from './CodeRandomUser/CodeRandomDictionary';
import { IAddressService } from './Services/Interfaces/IAddressService';
import { AddressService } from './Services/AddressService';
import { IAddressMap } from './Mappings/IMappings/IAddressMap';
import { AddressMap } from './Mappings/AddressMap';
import { CategoryService } from './Services/CategoryService';
import { ICategoryService } from './Services/Interfaces/ICategoryService';
import { ICategoryMap } from './Mappings/IMappings/ICategoryMap';
import { CategoryMap } from './Mappings/CategoryMap';
import { ICuponMap } from './Mappings/IMappings/ICuponMap';
import { CuponMap } from './Mappings/CuponMap';
import { ICuponService } from './Services/Interfaces/ICuponService';
import { CuponService } from './Services/CuponService';

@Module({
  imports: [RepositoriesModule, ConfigModule],
  providers: [
    CodeRandomDictionary,
    {
      provide: IUserManagementService,
      useClass: UserManagementService,
    },
    {
      provide: IUserAuthenticationService,
      useClass: UserAuthenticationService,
    },
    {
      provide: IAddressService,
      useClass: AddressService,
    },
    {
      provide: ICategoryService,
      useClass: CategoryService,
    },
    {
      provide: ICuponService,
      useClass: CuponService,
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
      provide: IAddressMap,
      useClass: AddressMap,
    },
    {
      provide: ICategoryMap,
      useClass: CategoryMap,
    },
    {
      provide: ICuponMap,
      useClass: CuponMap,
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
    ICategoryService,
    ICuponService,
    IUserMap,
    IAddressMap,
    ICategoryMap,
    ICuponMap,
    IClodinaryUti,
    ITokenGeneratorUser,
    IAddressService,
    // Exporte outros repositórios aqui, caso necessário
  ],
})
export class ApplicationModule {}

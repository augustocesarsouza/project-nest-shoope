import { Module } from '@nestjs/common';
import { IUserManagementService } from './Services/Interfaces/IUserManagementService';
import { UserManagementService } from './Services/UserManagementService';
import { IUserCreateAccountFunction } from './Services/Interfaces/IUserCreateAccountFunction';
import { UserCreateAccountFunction } from './Services/UserCreateAccountFunction';
import { IUserMap } from './Mappings/IMappings/IUserMap';
import { UserMap } from './Mappings/UserMap';
import { RepositoriesModule } from 'src/Shoope.Infra.Data/RepositoriesModule';

@Module({
  imports: [RepositoriesModule],
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
  ],
  exports: [
    IUserManagementService,
    IUserCreateAccountFunction,
    IUserMap,
    // Exporte outros repositórios aqui, caso necessário
  ],
})
export class ApplicationModule {}

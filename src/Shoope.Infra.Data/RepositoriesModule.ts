import { Module } from '@nestjs/common';
import { IUserRepository } from 'src/Shoope.Domain/Repositories/IUserRepository';
import { UserRepository } from './Repositories/UserRepository';
import { PrismaService } from './Context/Database/PrismaService';

@Module({
  providers: [
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [
    IUserRepository,
    // Exporte outros repositórios aqui, caso necessário
  ],
})
export class RepositoriesModule {}

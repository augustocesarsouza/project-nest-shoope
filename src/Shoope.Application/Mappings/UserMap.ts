import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserDTO } from 'src/Shoope.Application/DTOs/UserDTO';
import { User } from 'src/Shoope.Domain/Entities/User';
import { IUserMap } from './IMappings/IUserMap';

@Injectable()
export class UserMap implements IUserMap {
  transformToDTO(user: User): UserDTO {
    return plainToClass(UserDTO, user); // Transforma a entidade para DTO
  }

  transformToEntity(userDTO: UserDTO): User {
    return plainToClass(User, userDTO); // Transforma DTO de volta para entidade
  }
}

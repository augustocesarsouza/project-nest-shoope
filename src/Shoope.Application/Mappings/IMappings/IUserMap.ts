import { UserDTO } from 'src/Shoope.Application/DTOs/UserDTO';
import { User } from 'src/Shoope.Domain/Entities/User';

export abstract class IUserMap {
  abstract transformToDTO(user: User): UserDTO;
  abstract transformToEntity(userDTO: UserDTO): User;
}

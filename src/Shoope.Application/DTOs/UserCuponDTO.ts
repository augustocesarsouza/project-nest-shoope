import { CuponDTO } from './CuponDTO';
import { UserDTO } from './UserDTO';

export class UserCuponDTO {
  id: string;

  cuponId?: string;
  cuponDTO?: CuponDTO;

  userId?: string;
  userDTO?: UserDTO;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    cuponId?: string,
    cuponDTO?: CuponDTO,

    userId?: string,
    userDTO?: UserDTO,

    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.cuponId = cuponId;
    this.cuponDTO = cuponDTO;
    this.userId = userId;
    this.userDTO = userDTO;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

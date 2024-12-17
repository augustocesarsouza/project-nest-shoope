import { Cupon } from './Cupon';
import { User } from './User';

export class UserCupon {
  id: string;

  cuponId?: string;
  cupon?: Cupon;

  userId?: string;
  user?: User;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    cuponId?: string,
    cupon?: Cupon,

    userId?: string,
    user?: User,

    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.cuponId = cuponId;
    this.cupon = cupon;
    this.userId = userId;
    this.user = user;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

import { IsNotEmpty } from 'class-validator';

export class UserCuponDTOValidateCreate {
  @IsNotEmpty()
  cuponId?: string;
  @IsNotEmpty()
  userId?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

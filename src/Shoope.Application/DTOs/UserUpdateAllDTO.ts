import { IsNotEmpty } from 'class-validator';

export class UserUpdateAllDTO {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  name?: string;
  @IsNotEmpty()
  email?: string;
  @IsNotEmpty()
  gender?: string;
  @IsNotEmpty()
  phone?: string;
  cpf?: string;
  birthDate?: Date;
  base64StringImage?: string;

  constructor(init?: Partial<UserUpdateAllDTO>) {
    Object.assign(this, init);
  }
}

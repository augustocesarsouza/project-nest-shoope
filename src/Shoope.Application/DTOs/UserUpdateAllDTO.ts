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
  @IsNotEmpty()
  cpf?: string;
  birthDate?: Date;
  @IsNotEmpty()
  base64StringImage?: string;

  constructor(init?: Partial<UserUpdateAllDTO>) {
    Object.assign(this, init);
  }
}

import { IsNotEmpty } from 'class-validator';

export class UserUpdateFillDTO {
  @IsNotEmpty()
  userId?: string;
  @IsNotEmpty()
  cpf?: string;
  @IsNotEmpty()
  birthDate?: string;

  constructor(userId?: string, cpf?: string, birthDate?: string) {
    this.userId = userId;
    this.cpf = cpf;
    this.birthDate = birthDate;
  }
}

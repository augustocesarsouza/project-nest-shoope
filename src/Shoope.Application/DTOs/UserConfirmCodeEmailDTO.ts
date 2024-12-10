import { IsNotEmpty } from 'class-validator';

export class UserConfirmCodeEmailDTO {
  @IsNotEmpty()
  code?: string;
  @IsNotEmpty()
  userId?: string;
  @IsNotEmpty()
  email?: string;

  constructor(code?: string, userId?: string, email?: string) {
    this.code = code;
    this.userId = userId;
    this.email = email;
  }
}

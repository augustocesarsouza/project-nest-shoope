import { IsNotEmpty, Length } from 'class-validator';

export class UserCreateDTO {
  @IsNotEmpty()
  phone?: string;
  @IsNotEmpty()
  @Length(8, 30)
  password?: string;
  base64ImageUser?: string;
}

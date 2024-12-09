import { UserDTO } from './UserDTO';

export class UserLoginDTO {
  PasswordIsCorrect: boolean;
  UserDTO?: UserDTO;
}

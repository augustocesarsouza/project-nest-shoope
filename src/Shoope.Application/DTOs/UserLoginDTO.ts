import { UserDTO } from './UserDTO';

export class UserLoginDTO {
  passwordIsCorrect: boolean;
  userDTO?: UserDTO;

  constructor() {}
}

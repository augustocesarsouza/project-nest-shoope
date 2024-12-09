export class UserDTO {
  id: string;
  name?: string;
  email?: string;
  gender?: string;
  phone?: string;
  passwordHash?: string;
  salt?: string;
  cpf?: string;
  birthDate?: Date;
  token?: string;
  userImage?: string;

  constructor(init?: Partial<UserDTO>) {
    Object.assign(this, init);
  }

  public SetToken(token?: string) {
    this.token = token;
  }
}
// constructor(
//   id: string,
//   name: string,
//   email: string,
//   gender: string,
//   phone?: string,
//   passwordHash?: string,
//   salt?: string,
//   cpf?: string,
//   birthDate?: Date,
//   token?: string,
//   userImage?: string,
// ) {
//   this.id = id;
//   this.name = name;
//   this.email = email;
//   this.gender = gender;
//   this.phone = phone;
//   this.passwordHash = passwordHash;
//   this.salt = salt;
//   this.cpf = cpf;
//   this.birthDate = birthDate;
//   this.token = token;
//   this.userImage = userImage;
// }

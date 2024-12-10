export class User {
  id: string;
  name?: string;
  email?: string;
  gender?: string;
  phone?: string;
  passwordHash?: string;
  salt?: string;
  cpf?: string;
  birthDate?: Date;
  userImage?: string;

  constructor(
    id?: string,
    name?: string,
    email?: string,
    gender?: string,
    phone?: string,
    passwordHash?: string,
    salt?: string,
    cpf?: string,
    birthDate?: Date,
    userImage?: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.gender = gender;
    this.phone = phone;
    this.passwordHash = passwordHash;
    this.salt = salt;
    this.cpf = cpf;
    this.birthDate = birthDate;
    this.userImage = userImage;
  }

  public SetPasswordHash(passwordHash?: string) {
    this.passwordHash = passwordHash;
  }

  public SetSalt(salt?: string) {
    this.salt = salt;
  }

  public GetPasswordHash(): string {
    return this.passwordHash;
  }
}

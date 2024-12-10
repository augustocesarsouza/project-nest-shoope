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

export class UserAuthDTO {
  phone?: string;
  password?: string;

  constructor(init?: Partial<UserAuthDTO>) {
    Object.assign(this, init);
  }
}

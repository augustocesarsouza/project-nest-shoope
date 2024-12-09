export class TokenOutValue {
  acess_Token?: string;
  expirations?: Date;

  constructor() {}

  public ValidateToken(acess_Token?: string, expirations?: Date): boolean {
    if (acess_Token === null) return false;

    this.acess_Token = acess_Token;
    this.expirations = expirations;
    return true;
  }
}

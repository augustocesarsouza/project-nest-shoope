export abstract class IUserCreateAccountFunction {
  abstract HashPassword(password: string, salt: Uint8Array): string;
  abstract GenerateSalt(): Uint8Array;
}

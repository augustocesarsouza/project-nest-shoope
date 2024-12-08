export abstract class IUserCreateAccountFunction {
  abstract HashPassword(phone: string, salt: Uint8Array): string;
  abstract GenerateSalt(): Uint8Array;
}

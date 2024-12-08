import { Injectable } from '@nestjs/common';
import { IUserCreateAccountFunction } from './Interfaces/IUserCreateAccountFunction';
import { randomBytes, createHash } from 'crypto';

@Injectable()
export class UserCreateAccountFunction implements IUserCreateAccountFunction {
  HashPassword(phone: string, salt: Uint8Array): string {
    const passwordBytes = Buffer.from(phone, 'utf-8');
    const saltedPassword = Buffer.concat([passwordBytes, salt]);

    // Usando SHA-256 para hashear o password + salt
    const sha256Hash = createHash('sha256');
    sha256Hash.update(saltedPassword);
    const hashedBytes = sha256Hash.digest();

    // Concatenando o salt com o hash gerado
    const hashedPasswordWithSalt = Buffer.concat([salt, hashedBytes]);

    return hashedPasswordWithSalt.toString('base64'); // Retorna em Base64
  }

  GenerateSalt(): Uint8Array {
    // Gerando um salt aleatório de 32 bytes
    const salt = randomBytes(32);
    return salt;
  }
}

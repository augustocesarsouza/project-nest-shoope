import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITokenGeneratorUser } from 'src/Shoope.Domain/Authentication/ITokenGeneratorUser';
import { TokenOutValue } from 'src/Shoope.Domain/Authentication/TokenOutValue';
import { User } from 'src/Shoope.Domain/Entities/User';
import * as jwt from 'jsonwebtoken';
import { InfoErrors } from 'src/Shoope.Domain/InfoErrors/InfoErrors';

@Injectable()
export class TokenGeneratorUser implements ITokenGeneratorUser {
  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

  Generator(user: User, expiresIn: string = '1h'): InfoErrors<TokenOutValue | null> {
    if (!user || !user.id || !user.phone) {
      return InfoErrors.failData<TokenOutValue>('User data is invalid');
    }

    // Obter a chave secreta do arquivo de configuração
    const keySecret = this.configService.get<string>('KEY_JWT');

    if (!keySecret || keySecret.length < 16) {
      return InfoErrors.failData<TokenOutValue>('Invalid JWT secret key');
    }

    // const expiresIn = '10s'; // Tempo de expiração do token
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // Data de expiração

    // Claims (dados adicionais do token)
    const claims = {
      phone: user.phone,
      userID: user.id,
    };

    // Gerar o token
    const token = jwt.sign(claims, keySecret, {
      expiresIn,
    });

    const tokenOutValue = new TokenOutValue();
    tokenOutValue.ValidateToken(token, expires);

    return InfoErrors.okData<TokenOutValue>(tokenOutValue);
  }

  // Generator(user: User): InfoErrors {
  //   throw new Error('Method not implemented.');
  // }
}

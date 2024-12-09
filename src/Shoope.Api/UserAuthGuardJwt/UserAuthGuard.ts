import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CustomUnauthorizedException } from './CustomUnauthorizedException';

@Injectable()
export class UserAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;

    // Obter o token do cabeçalho Authorization
    const authHeader = headers['authorization'];
    const uidHeader = headers['uid'];

    if (!authHeader || !uidHeader) {
      throw new CustomUnauthorizedException('Token or UID missing');
    }

    // Extrair o token (Bearer <token>)
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new CustomUnauthorizedException('Invalid token format');
    }

    try {
      // Verificar e decodificar o token
      const secretKey = process.env.KEY_JWT || 'defaultSecret';
      const payload = jwt.verify(token, secretKey) as any;

      // Comparar o uid do header com o id do token
      if (payload.userID !== uidHeader) {
        throw new CustomUnauthorizedException('UID does not match token ID');
      }

      // Adicionar dados do usuário à requisição (se necessário)
      request.user = payload;
      return true;
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new CustomUnauthorizedException('Token has expired');
      } else {
        throw new CustomUnauthorizedException(err.message);
      }
    }
  }
}

import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomUnauthorizedException extends HttpException {
  constructor(message: string) {
    super(
      {
        data: {
          message,
          error: 'Unauthorized',
          statusCode: HttpStatus.UNAUTHORIZED,
        },
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

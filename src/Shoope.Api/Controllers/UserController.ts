import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { IUserManagementService } from 'src/Shoope.Application/Services/Interfaces/IUserManagementService';
import { IBaseController } from '../ControllersInterfaces/IBaseController';
import { ICurrentUser } from 'src/Shoope.Domain/Authentication/ICurrentUser';
import { UserCreateDTO } from 'src/Shoope.Application/DTOs/UserCreateDTO';

@Controller('v1/public/user')
export class UserController {
  constructor(
    private readonly _userManagementService: IUserManagementService,
    private readonly _baseController: IBaseController,
    private readonly _currentUser: ICurrentUser,
  ) {}

  @Get('get-user/:phone')
  @HttpCode(HttpStatus.OK)
  async GetUser(@Param('phone') phone: string) {
    const userAuth = this._baseController.Validator(this._currentUser);

    if (!userAuth) {
      return this._baseController.Forbidden();
    }

    const result = await this._userManagementService.CheckEmailAlreadyExists(phone);

    if (result.isSuccess) {
      return { statusCode: HttpStatus.OK, result };
      // return { statusCode: HttpStatus.OK, data: result };
    }

    return { statusCode: HttpStatus.BAD_REQUEST, result };
  }

  @Post('create')
  @HttpCode(HttpStatus.OK) // O código de status será OK por padrão
  async createAsync(@Body() userCreateDTO: UserCreateDTO) {
    const result = await this._userManagementService.Create(userCreateDTO);

    if (result.isSuccess) {
      return { statusCode: HttpStatus.OK, result };
      // return { statusCode: HttpStatus.OK, data: result };
    }

    return { statusCode: HttpStatus.BAD_REQUEST, data: result };
  }
}

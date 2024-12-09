import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IUserManagementService } from 'src/Shoope.Application/Services/Interfaces/IUserManagementService';
import { IBaseController } from '../ControllersInterfaces/IBaseController';
import { ICurrentUser } from 'src/Shoope.Domain/Authentication/ICurrentUser';
import { UserCreateDTO } from 'src/Shoope.Application/DTOs/UserCreateDTO';
import { UserUpdateAllDTO } from 'src/Shoope.Application/DTOs/UserUpdateAllDTO';
import { IUserAuthenticationService } from 'src/Shoope.Application/Services/Interfaces/IUserAuthenticationService';
import { Response } from 'express';
import { UserAuthGuard } from '../UserAuthGuardJwt/UserAuthGuard';

@Controller('v1/public/user')
export class UserController {
  constructor(
    private readonly _userManagementService: IUserManagementService,
    private readonly _userAuthenticationService: IUserAuthenticationService,
    private readonly _baseController: IBaseController,
    private readonly _currentUser: ICurrentUser,
  ) {}

  @UseGuards(UserAuthGuard)
  @Get('get-user/:phone')
  async GetUser(@Param('phone') phone: string, @Res() res: Response) {
    const result = await this._userManagementService.CheckEmailAlreadyExists(phone);

    if (result.isSuccess) {
      // return { statusCode: HttpStatus.OK, result };
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result.data,
    });
  }

  @Get('login/:phone/:password')
  async Login(
    @Param('phone') phone: string,
    @Param('password') password: string,
    @Res() res: Response,
  ) {
    // const userAuth = this._baseController.Validator(this._currentUser);

    // if (!userAuth) {
    //   return this._baseController.Forbidden();
    // }

    const result = await this._userAuthenticationService.Login(phone, password);

    if (result.isSuccess) {
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result,
    });
  }

  @Post('create')
  async createAsync(@Body() userCreateDTO: UserCreateDTO, @Res() res: Response) {
    const result = await this._userManagementService.Create(userCreateDTO);

    if (result.isSuccess) {
      // return { statusCode: HttpStatus.OK, data: result };
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    // return { statusCode: HttpStatus.BAD_REQUEST, data: result };
    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result,
    });
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  async updateAsync(@Body() userUpdateAllDTO: UserUpdateAllDTO, @Res() res: Response) {
    const result = await this._userManagementService.UpdateUserAll(userUpdateAllDTO);

    if (result.isSuccess) {
      // return { statusCode: HttpStatus.OK, result };
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    // return { statusCode: HttpStatus.BAD_REQUEST, data: result };
    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result,
    });
  }

  @Delete('delete/:userId')
  async deleteUser(@Param('userId') userId: string, @Res() res: Response) {
    // const userAuth = this._baseController.Validator(this._currentUser);

    // if (!userAuth) {
    //   return this._baseController.Forbidden();
    // }

    const result = await this._userManagementService.DeleteUser(userId);

    if (result.isSuccess) {
      // return { statusCode: HttpStatus.OK, result };
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    // return { statusCode: HttpStatus.BAD_REQUEST, result };
    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result,
    });
  }
}

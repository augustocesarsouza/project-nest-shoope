import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IUserManagementService } from 'src/Shoope.Application/Services/Interfaces/IUserManagementService';
import { UserCreateDTO } from 'src/Shoope.Application/DTOs/UserCreateDTO';
import { UserUpdateAllDTO } from 'src/Shoope.Application/DTOs/UserUpdateAllDTO';
import { IUserAuthenticationService } from 'src/Shoope.Application/Services/Interfaces/IUserAuthenticationService';
import { Response } from 'express';
import { UserAuthGuard } from '../UserAuthGuardJwt/UserAuthGuard';
import { UserUpdateFillDTO } from 'src/Shoope.Application/DTOs/UserUpdateFillDTO';
import { UserChangePasswordDTO } from 'src/Shoope.Application/DTOs/UserChangePasswordDTO';
import { CodeSendEmailUserDTO } from 'src/Shoope.Application/DTOs/CodeSendEmailUserDTO';
import { UserConfirmCodeEmailDTO } from 'src/Shoope.Application/DTOs/UserConfirmCodeEmailDTO';

@Controller('v1/public/user')
export class UserController {
  constructor(
    private readonly _userManagementService: IUserManagementService,
    private readonly _userAuthenticationService: IUserAuthenticationService,
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

  @Get('get-user-by-id/:userId')
  async GetByIdInfoUser(@Param('userId') userId: string, @Res() res: Response) {
    const result = await this._userAuthenticationService.GetByIdInfoUser(userId);

    if (result.isSuccess) {
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result,
    });
  }

  @Get('login/:phone/:password')
  async Login(
    @Param('phone') phone: string,
    @Param('password') password: string,
    @Res() res: Response,
  ) {
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

  @Get('verify-password/:phone/:password')
  async VerifyPasswordUser(
    @Param('phone') phone: string,
    @Param('password') password: string,
    @Res() res: Response,
  ) {
    const result = await this._userAuthenticationService.VerifyPasswordUser(phone, password);

    if (result.isSuccess) {
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result,
    });
  }

  @Post('verific')
  async Verfic(@Body() userConfirmCodeEmailDTO: UserConfirmCodeEmailDTO, @Res() res: Response) {
    const result =
      await this._userAuthenticationService.VerficEmailAlreadySetUp(userConfirmCodeEmailDTO);

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

  @Post('confirm-email-send-code')
  async ConfirmEmailSendCode(
    @Body() codeSendEmailUserDTO: CodeSendEmailUserDTO,
    @Res() res: Response,
  ) {
    const result = await this._userAuthenticationService.SendCodeEmail(codeSendEmailUserDTO);

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

  @Post('change-password')
  async changePasswordUser(
    @Body() userChangePasswordDTO: UserChangePasswordDTO,
    @Res() res: Response,
  ) {
    const result = await this._userAuthenticationService.ChangePasswordUser(userChangePasswordDTO);

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

  @Put('update-user')
  async updateUserAsync(@Body() userUpdateFillDTO: UserUpdateFillDTO, @Res() res: Response) {
    const result = await this._userManagementService.UpdateUser(userUpdateFillDTO);

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

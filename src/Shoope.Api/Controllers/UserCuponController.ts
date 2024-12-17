import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserCuponDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/UserCuponDTOValidate/UserCuponDTOValidateCreate';
import { IUserCuponService } from 'src/Shoope.Application/Services/Interfaces/IUserCuponService';

@Controller('v1/user-cupon')
export class UserCuponController {
  constructor(private readonly _userCuponService: IUserCuponService) {}

  // @UseGuards(UserAuthGuard)
  @Get('get-all-cupon-by-user-id/:userId')
  async GetCategoriesById(@Param('userId') userId: string, @Res() res: Response) {
    const result = await this._userCuponService.GetAllCuponByUserId(userId);

    if (result.isSuccess) {
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result.data,
    });
  }

  @Post('create')
  async CreateAsync(
    @Body() userCuponDTOValidateCreate: UserCuponDTOValidateCreate,
    @Res() res: Response,
  ) {
    const result = await this._userCuponService.Create(userCuponDTOValidateCreate);

    if (result.isSuccess) {
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result,
    });
  }
}

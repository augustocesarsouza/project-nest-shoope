import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PromotionUserDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/PromotionUserDTOValidate/PromotionUserDTOValidateCreate';
import { IPromotionUserService } from 'src/Shoope.Application/Services/Interfaces/IPromotionUserService';

@Controller('v1/promotion-user')
export class PromotionUserController {
  constructor(private readonly _promotionUserService: IPromotionUserService) {}

  // @UseGuards(UserAuthGuard)
  @Get('get-by-user-id-all/:userId')
  async GetCategoriesById(@Param('userId') userId: string, @Res() res: Response) {
    const result = await this._promotionUserService.GetByUserIdAll(userId);

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
    @Body() promotionUserDTOValidateCreate: PromotionUserDTOValidateCreate,
    @Res() res: Response,
  ) {
    const result = await this._promotionUserService.Create(promotionUserDTOValidateCreate);

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

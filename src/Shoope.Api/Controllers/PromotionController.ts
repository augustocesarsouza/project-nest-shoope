import { Body, Controller, Delete, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PromotionDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/PromotionDTOValidate/PromotionDTOValidateCreate';
import { IPromotionService } from 'src/Shoope.Application/Services/Interfaces/IPromotionService';

@Controller('v1/promotion')
export class PromotionController {
  constructor(private readonly _promotionService: IPromotionService) {}

  // @UseGuards(UserAuthGuard)

  @Post('create')
  async CreateAsync(
    @Body() promotionDTOValidateCreate: PromotionDTOValidateCreate,
    @Res() res: Response,
  ) {
    const result = await this._promotionService.Create(promotionDTOValidateCreate);

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

  @Delete('delete/:promotionId')
  async DeleteAsync(@Param('promotionId') promotionId: string, @Res() res: Response) {
    const result = await this._promotionService.DeletePromotion(promotionId);

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

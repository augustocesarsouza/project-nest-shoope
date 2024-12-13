import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { FlashSaleProductAllInfoDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/FlashSaleProductAllInfoDTOValidate/FlashSaleProductAllInfoDTOValidateCreate';
import { IFlashSaleProductAllInfoService } from 'src/Shoope.Application/Services/Interfaces/IFlashSaleProductAllInfoService';

@Controller('v1/flash-sale-product-all-info')
export class FlashSaleProductAllInfoController {
  constructor(private readonly _flashSaleProductAllInfoService: IFlashSaleProductAllInfoService) {}

  // @UseGuards(UserAuthGuard)
  @Get('get-flash-sale-product-by-product-flash-sale-id/:productFlashSaleId')
  async GetFlashSaleProductByProductFlashSaleId(
    @Param('productFlashSaleId') productFlashSaleId: string,
    @Res() res: Response,
  ) {
    const result =
      await this._flashSaleProductAllInfoService.GetFlashSaleProductByProductFlashSaleId(
        productFlashSaleId,
      );

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

  @Post('create')
  async CreateAsync(
    @Body() flashSaleProductCreate: FlashSaleProductAllInfoDTOValidateCreate,
    @Res() res: Response,
  ) {
    const result = await this._flashSaleProductAllInfoService.Create(flashSaleProductCreate);

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

  @Delete('delete/:flashSaleProductAllInfoId')
  async DeleteAsync(
    @Param('flashSaleProductAllInfoId') flashSaleProductAllInfoId: string,
    @Res() res: Response,
  ) {
    const result = await this._flashSaleProductAllInfoService.Delete(flashSaleProductAllInfoId);

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

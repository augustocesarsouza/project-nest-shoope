import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductDiscoveriesOfDayDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/ProductDiscoveriesOfDayDTOValidate/ProductDiscoveriesOfDayDTOValidateCreate';
import { IProductDiscoveriesOfDayService } from 'src/Shoope.Application/Services/Interfaces/IProductDiscoveriesOfDayService';

@Controller('v1/product-discoveries-of-day')
export class ProductDiscoveriesOfDayController {
  constructor(private readonly _productDiscoveriesOfDayService: IProductDiscoveriesOfDayService) {}

  // @UseGuards(UserAuthGuard)
  @Get('get-product-discoveries-of-day-by-id/:productDiscoveriesOfDayId')
  async GetFlashSaleProductByProductFlashSaleId(
    @Param('productDiscoveriesOfDayId') productDiscoveriesOfDayId: string,
    @Res() res: Response,
  ) {
    const result =
      await this._productDiscoveriesOfDayService.GetProductDiscoveriesOfDayById(
        productDiscoveriesOfDayId,
      );

    if (result.isSuccess) {
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result.data,
    });
  }

  @Get('get-all-product-discoveries-of-day')
  async GetAllCategories(@Res() res: Response) {
    const result = await this._productDiscoveriesOfDayService.GetAllProductDiscoveriesOfDays();

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
    @Body() productDiscoveriesOfDayDTOValidateCreate: ProductDiscoveriesOfDayDTOValidateCreate,
    @Res() res: Response,
  ) {
    const result = await this._productDiscoveriesOfDayService.Create(
      productDiscoveriesOfDayDTOValidateCreate,
    );

    if (result.isSuccess) {
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    // return { statusCode: HttpStatus.BAD_REQUEST, data: result };
    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result,
    });
  }

  @Delete('delete/:id')
  async DeleteAsync(@Param('id') id: string, @Res() res: Response) {
    const result = await this._productDiscoveriesOfDayService.Delete(id);

    if (result.isSuccess) {
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

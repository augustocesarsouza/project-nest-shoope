import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductFlashSaleReviewsDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/ProductFlashSaleReviewsDTOValidate/ProductFlashSaleReviewsDTOValidateCreate';
import { IProductFlashSaleReviewsService } from 'src/Shoope.Application/Services/Interfaces/IProductFlashSaleReviewsService';

@Controller('v1/product-flash-sale-reviews')
export class ProductFlashSaleReviewsController {
  constructor(private readonly _productFlashSaleReviewsService: IProductFlashSaleReviewsService) {}

  // @UseGuards(UserAuthGuard)
  @Get('get-all-product-flash-sale-reviews-by-product-flash-sale-id/:productFlashSaleId')
  async GetFlashSaleProductByProductFlashSaleId(
    @Param('productFlashSaleId') productFlashSaleId: string,
    @Res() res: Response,
  ) {
    const result =
      await this._productFlashSaleReviewsService.GetAllProductFlashSaleReviewsByProductFlashSaleId(
        productFlashSaleId,
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

  @Post('create')
  async CreateAsync(
    @Body() productFlashSaleReviewsDTOValidateCreate: ProductFlashSaleReviewsDTOValidateCreate,
    @Res() res: Response,
  ) {
    const result = await this._productFlashSaleReviewsService.Create(
      productFlashSaleReviewsDTOValidateCreate,
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
    const result = await this._productFlashSaleReviewsService.Delete(id);

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

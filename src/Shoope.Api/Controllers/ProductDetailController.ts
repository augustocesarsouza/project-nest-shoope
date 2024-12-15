import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductDetailDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/ProductDetailDTOValidate/ProductDetailDTOValidateCreate';
import { IProductDetailService } from 'src/Shoope.Application/Services/Interfaces/IProductDetailService';

@Controller('v1/product-detail')
export class ProductDetailController {
  constructor(private readonly _productDetailService: IProductDetailService) {}

  // @UseGuards(UserAuthGuard)
  @Get('get-product-detail-by-product-id/:productId')
  async GetFlashSaleProductByProductFlashSaleId(
    @Param('productId') productId: string,
    @Res() res: Response,
  ) {
    const result = await this._productDetailService.GetProductDetailByProductId(productId);

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
    @Body() productDetailDTOValidateCreate: ProductDetailDTOValidateCreate,
    @Res() res: Response,
  ) {
    const result = await this._productDetailService.Create(productDetailDTOValidateCreate);

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
    const result = await this._productDetailService.Delete(id);

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

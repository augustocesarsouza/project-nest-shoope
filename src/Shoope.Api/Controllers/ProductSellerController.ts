import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductSellerDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/ProductSellerDTOValidate/ProductSellerDTOValidateCreate';
import { IProductSellerService } from 'src/Shoope.Application/Services/Interfaces/IProductSellerService';

@Controller('v1/product-seller')
export class ProductSellerController {
  constructor(private readonly _productSellerService: IProductSellerService) {}

  // @UseGuards(UserAuthGuard)
  @Get('get-user-seller-product-id/:productId')
  async GetCategoriesById(@Param('productId') productId: string, @Res() res: Response) {
    const result = await this._productSellerService.GetById(productId);

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
    @Body() productSellerDTOValidateCreate: ProductSellerDTOValidateCreate,
    @Res() res: Response,
  ) {
    const result = await this._productSellerService.Create(productSellerDTOValidateCreate);

    if (result.isSuccess) {
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result,
    });
  }

  @Delete('delete/:id')
  async DeleteAsync(@Param('id') id: string, @Res() res: Response) {
    const result = await this._productSellerService.Delete(id);

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

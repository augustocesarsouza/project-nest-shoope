import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductDescriptionDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/ProductDescriptionDTOValidate/ProductDescriptionDTOValidateCreate';
import { IProductDescriptionService } from 'src/Shoope.Application/Services/Interfaces/IProductDescriptionService';

@Controller('v1/product-description')
export class ProductDescriptionController {
  constructor(private readonly _productDescriptionService: IProductDescriptionService) {}

  // @UseGuards(UserAuthGuard)
  @Get('get-product-description-by-product-id/:productId')
  async GetByUserId(@Param('productId') productId: string, @Res() res: Response) {
    const result =
      await this._productDescriptionService.GetProductDescriptionByProductId(productId);

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
  async Create(
    @Body() productDescriptionDTOValidateCreate: ProductDescriptionDTOValidateCreate,
    @Res() res: Response,
  ) {
    const result = await this._productDescriptionService.Create(
      productDescriptionDTOValidateCreate,
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

  @Delete('delete/:id')
  async DeleteAsync(@Param('id') id: string, @Res() res: Response) {
    const result = await this._productDescriptionService.Delete(id);

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

import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductOptionImageDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/ProductOptionImageDTOValidate/ProductOptionImageDTOValidateCreate';
import { IProductOptionImageService } from 'src/Shoope.Application/Services/Interfaces/IProductOptionImageService';

@Controller('v1/product-option-image')
export class ProductOptionImageController {
  constructor(private readonly _productOptionImageService: IProductOptionImageService) {}

  // @UseGuards(UserAuthGuard)
  @Get('get-by-list-flash-sale-product-image-all-id/:productsOfferFlashId')
  async GetCategoriesById(
    @Param('productsOfferFlashId') productsOfferFlashId: string,
    @Res() res: Response,
  ) {
    const result =
      await this._productOptionImageService.GetByListFlashSaleProductImageAllId(
        productsOfferFlashId,
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
    @Body() productOptionImageDTOValidateCreate: ProductOptionImageDTOValidateCreate,
    @Res() res: Response,
  ) {
    const result = await this._productOptionImageService.Create(
      productOptionImageDTOValidateCreate,
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

  @Delete('delete/:productsOfferFlashId')
  async DeleteAsync(
    @Param('productsOfferFlashId') productsOfferFlashId: string,
    @Res() res: Response,
  ) {
    const result =
      await this._productOptionImageService.DeleteAllByProductsOfferFlashId(productsOfferFlashId);

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

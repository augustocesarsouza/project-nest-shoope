import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductsOfferFlashDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/ProductsOfferFlashDTOValidate/ProductsOfferFlashDTOValidateCreate';
import { IProductsOfferFlashService } from 'src/Shoope.Application/Services/Interfaces/IProductsOfferFlashService';

@Controller('v1/product-offer-flash')
export class ProductsOfferFlashServiceController {
  constructor(private readonly _productsOfferFlashService: IProductsOfferFlashService) {}

  // @UseGuards(UserAuthGuard)
  @Get('get-product-offer-flash-all')
  async GetAllProduct(@Res() res: Response) {
    const result = await this._productsOfferFlashService.GetAllProduct();

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

  @Get('get-all-by-tag-product/:hourFlashOffer/:tagProduct/:pageNumber/:pageSize')
  async GetAllByTagProduct(
    @Param('hourFlashOffer') hourFlashOffer: string,
    @Param('tagProduct') tagProduct: string,
    @Param('pageNumber') pageNumber: string,
    @Param('pageSize') pageSize: string,
    @Res() res: Response,
  ) {
    const result = await this._productsOfferFlashService.GetAllByTagProduct(
      hourFlashOffer,
      tagProduct,
      Number(pageNumber),
      Number(pageSize),
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
    @Body() productCreate: ProductsOfferFlashDTOValidateCreate,
    @Res() res: Response,
  ) {
    const result = await this._productsOfferFlashService.Create(productCreate);

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

  @Delete('delete/:productsOfferFlashId')
  async DeleteAsync(
    @Param('productsOfferFlashId') productsOfferFlashId: string,
    @Res() res: Response,
  ) {
    const result = await this._productsOfferFlashService.Delete(productsOfferFlashId);

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

import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductHighlightDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/ProductHighlightDTOValidate/ProductHighlightDTOValidateCreate';
import { IProductHighlightService } from 'src/Shoope.Application/Services/Interfaces/IProductHighlightService';

@Controller('v1/product-highlight')
export class ProductHighlightController {
  constructor(private readonly _productHighlightService: IProductHighlightService) {}

  // @UseGuards(UserAuthGuard)
  @Get('get-product-highlight-by-id/:productHighlightId')
  async GetCategoriesById(
    @Param('productHighlightId') productHighlightId: string,
    @Res() res: Response,
  ) {
    const result = await this._productHighlightService.GetProductHighlightById(productHighlightId);

    if (result.isSuccess) {
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result.data,
    });
  }

  @Get('get-all-product-highlights')
  async GetAllCategories(@Res() res: Response) {
    const result = await this._productHighlightService.GetAllProductHighlights();

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
    @Body() productHighlightDTOValidateCreate: ProductHighlightDTOValidateCreate,
    @Res() res: Response,
  ) {
    const result = await this._productHighlightService.Create(productHighlightDTOValidateCreate);

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
    const result = await this._productHighlightService.Delete(id);

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

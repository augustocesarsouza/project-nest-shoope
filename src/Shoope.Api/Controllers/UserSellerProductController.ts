import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserSellerProductDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/UserSellerProductDTOValidate/UserSellerProductDTOValidateCreate';
import { IUserSellerProductService } from 'src/Shoope.Application/Services/Interfaces/IUserSellerProductService';

@Controller('v1/user-seller-product')
export class UserSellerProductController {
  constructor(private readonly _userSellerProductService: IUserSellerProductService) {}

  // @UseGuards(UserAuthGuard)
  @Get('get-user-seller-product-by-id/:userSellerProductId')
  async GetById(@Param('userSellerProductId') userSellerProductId: string, @Res() res: Response) {
    const result = await this._userSellerProductService.GetById(userSellerProductId);

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
    @Body() userSellerProductDTOValidateCreate: UserSellerProductDTOValidateCreate,
    @Res() res: Response,
  ) {
    const result = await this._userSellerProductService.Create(userSellerProductDTOValidateCreate);

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
    const result = await this._userSellerProductService.Delete(id);

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

import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CuponCreateDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/CuponDTOValidate/CuponCreateDTOValidateCreate';
import { ICuponService } from 'src/Shoope.Application/Services/Interfaces/ICuponService';

@Controller('v1/cupon')
export class CuponController {
  constructor(private readonly _cuponService: ICuponService) {}

  // @UseGuards(UserAuthGuard)
  @Get('get-cupon-by-id/:cuponId')
  async GetByUserId(@Param('cuponId') cuponId: string, @Res() res: Response) {
    const result = await this._cuponService.GetCuponById(cuponId);

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
    @Body() cuponCreateDTOValidateCreate: CuponCreateDTOValidateCreate,
    @Res() res: Response,
  ) {
    const result = await this._cuponService.Create(cuponCreateDTOValidateCreate);

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

  @Delete('delete/:cuponId')
  async DeleteAsync(@Param('cuponId') cuponId: string, @Res() res: Response) {
    const result = await this._cuponService.Delete(cuponId);

    if (result.isSuccess) {
      // return { statusCode: HttpStatus.OK, result };
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

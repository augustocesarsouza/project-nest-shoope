import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LikeReviewDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/LikeReviewDTOValidate/LikeReviewDTOValidateCreate';
import { LikeReviewDTOValidateDelete } from 'src/Shoope.Application/DTOs/Validations/LikeReviewDTOValidate/LikeReviewDTOValidateDelete';
import { ILikeReviewService } from 'src/Shoope.Application/Services/Interfaces/ILikeReviewService';

@Controller('v1/like-review')
export class LikeReviewController {
  constructor(private readonly _likeReviewService: ILikeReviewService) {}

  // @UseGuards(UserAuthGuard)
  @Get('get-by-product-flash-sale-reviews-id/:productFlashSaleReviewsId')
  async GetAddressById(
    @Param('productFlashSaleReviewsId') productFlashSaleReviewsId: string,
    @Res() res: Response,
  ) {
    const result =
      await this._likeReviewService.GetByProductFlashSaleReviewsId(productFlashSaleReviewsId);

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
    @Body() likeReviewDTOValidateCreate: LikeReviewDTOValidateCreate,
    @Res() res: Response,
  ) {
    const result = await this._likeReviewService.Create(likeReviewDTOValidateCreate);

    if (result.isSuccess) {
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result.data,
    });
  }

  @Delete('delete')
  async DeleteAsync(
    @Body() likeReviewDTOValidateDelete: LikeReviewDTOValidateDelete,
    @Res() res: Response,
  ) {
    const result = await this._likeReviewService.Delete(likeReviewDTOValidateDelete);

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

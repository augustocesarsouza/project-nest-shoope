import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CategoryDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/CategoryDTOValidate/CategoryDTOValidateCreate';
import { ICategoryService } from 'src/Shoope.Application/Services/Interfaces/ICategoryService';

@Controller('v1/categories')
export class CategoryController {
  constructor(private readonly _categoryService: ICategoryService) {}

  // @UseGuards(UserAuthGuard)
  @Get('get-categories-by-id/:categoryId')
  async GetCategoriesById(@Param('categoryId') categoryId: string, @Res() res: Response) {
    const result = await this._categoryService.GetCategoriesById(categoryId);

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

  @Get('get-all-categories')
  async GetAllCategories(@Res() res: Response) {
    const result = await this._categoryService.GetAllCategories();

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
    @Body() categoryDTOValidateCreate: CategoryDTOValidateCreate,
    @Res() res: Response,
  ) {
    const result = await this._categoryService.Create(categoryDTOValidateCreate);

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

  @Delete('delete/:categoryId')
  async DeleteAsync(@Param('categoryId') categoryId: string, @Res() res: Response) {
    const result = await this._categoryService.Delete(categoryId);

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

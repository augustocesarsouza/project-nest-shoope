import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ICategoryService } from './Interfaces/ICategoryService';
import { ICategoryRepository } from 'src/Shoope.Domain/Repositories/ICategoryRepository';
import { ICategoryMap } from '../Mappings/IMappings/ICategoryMap';
import { CategoryDTO } from '../DTOs/CategoryDTO';
import { ResultService } from './ResultService';
import { CategoryDTOValidateCreate } from '../DTOs/Validations/CategoryDTOValidate/CategoryDTOValidateCreate';
import { Category } from 'src/Shoope.Domain/Entities/Category';
import { IClodinaryUti } from 'src/Shoope.Infra.Data/UtilityExternal/Interface/IClodinaryUti';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    private readonly _categoryRepository: ICategoryRepository,
    private readonly _categoryMap: ICategoryMap,
    private readonly _clodinaryUti: IClodinaryUti,
  ) {}

  async GetCategoriesById(categorieId: string): Promise<ResultService<CategoryDTO | null>> {
    try {
      const categorie = await this._categoryRepository.GetCategoriesById(categorieId);

      if (!categorie) {
        return ResultService.fail<CategoryDTO | null>('Address not found');
      }

      return ResultService.ok<CategoryDTO>(this._categoryMap.transformToDTO(categorie));
    } catch (error) {
      return ResultService.fail<CategoryDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async GetAllCategories(): Promise<ResultService<CategoryDTO[] | null>> {
    try {
      const categories = await this._categoryRepository.GetAllCategories();

      if (!categories) {
        return ResultService.fail<CategoryDTO[] | null>('Address not found');
      }

      return ResultService.ok<CategoryDTO[]>(this._categoryMap.transformToDTOList(categories));
    } catch (error) {
      return ResultService.fail<CategoryDTO[] | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Create(
    categoryDTOValidateCreate: CategoryDTOValidateCreate | null,
  ): Promise<ResultService<CategoryDTO | null>> {
    try {
      if (categoryDTOValidateCreate === null) ResultService.fail<CategoryDTO | null>('DTO is null');

      const result = await this._clodinaryUti.CreateMedia(
        categoryDTOValidateCreate.imgCategory,
        'category-all',
        244,
        244,
      );

      if (!result.createdSuccessfully)
        return ResultService.fail<CategoryDTO | null>(
          'Invalid media type. Only images and videos are supported.',
        );

      if (result.imgUrl === null || result.publicId === null)
        return ResultService.fail<CategoryDTO | null>('Error creating image on Cloudinary');

      const id = uuidv4();
      const category = new Category(
        id,
        result.imgUrl,
        categoryDTOValidateCreate.altValue,
        categoryDTOValidateCreate.title,
      );

      const categoryCreate = await this._categoryRepository.Create(category);

      return ResultService.ok<CategoryDTO>(this._categoryMap.transformToDTO(categoryCreate));
    } catch (error) {
      return ResultService.fail<CategoryDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  Delete(categoryId: string): Promise<ResultService<CategoryDTO | null>> {
    throw new Error('Method not implemented.' + categoryId);
  }
}

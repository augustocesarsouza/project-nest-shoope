import { CategoryDTO } from 'src/Shoope.Application/DTOs/CategoryDTO';
import { ResultService } from '../ResultService';

export abstract class ICategoryService {
  abstract GetCategoriesById(categorieId: string): Promise<ResultService<CategoryDTO | null>>;
  abstract GetAllCategories(): Promise<ResultService<CategoryDTO[] | null>>;
  abstract Create(categoryDTO: CategoryDTO | null): Promise<ResultService<CategoryDTO | null>>;
  abstract Delete(categoryId: string): Promise<ResultService<CategoryDTO | null>>;
}

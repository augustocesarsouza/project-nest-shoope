import { Category } from '../Entities/Category';

export abstract class ICategoryRepository {
  abstract GetCategoriesById(categorieId: string): Promise<Category | null>;
  abstract GetAllCategories(): Promise<Category[] | null>;
  abstract Create(entity: Category): Promise<Category | null>;
  abstract Update(entity: Category): Promise<Category | null>;
  abstract Delete(id: string): Promise<Category | null>;
}

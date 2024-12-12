import { CategoryDTO } from 'src/Shoope.Application/DTOs/CategoryDTO';
import { Category } from 'src/Shoope.Domain/Entities/Category';

export abstract class ICategoryMap {
  abstract transformToDTO(category: Category): CategoryDTO;
  abstract transformToEntity(categoryDTO: CategoryDTO): Category;
  abstract transformToDTOList(categoryList: Category[]): CategoryDTO[];
  abstract transformToEntityList(categoryDTO: CategoryDTO[]): Category[];
}

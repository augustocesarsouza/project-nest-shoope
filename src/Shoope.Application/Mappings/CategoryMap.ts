import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ICategoryMap } from './IMappings/ICategoryMap';
import { Category } from 'src/Shoope.Domain/Entities/Category';
import { CategoryDTO } from '../DTOs/CategoryDTO';

@Injectable()
export class CategoryMap implements ICategoryMap {
  transformToDTO(category: Category): CategoryDTO {
    return plainToClass(CategoryDTO, category);
  }

  transformToEntity(categoryDTO: CategoryDTO): Category {
    return plainToClass(Category, categoryDTO);
  }

  transformToDTOList(categoryList: Category[]): CategoryDTO[] {
    const entityAllDTO: CategoryDTO[] = [];
    for (let i = 0; i < categoryList.length; i++) {
      entityAllDTO.push(this.transformToDTO(categoryList[i]));
    }
    return entityAllDTO;
  }

  transformToEntityList(categoryDTO: CategoryDTO[]): Category[] {
    const entityAll: Category[] = [];
    for (let i = 0; i < categoryDTO.length; i++) {
      entityAll.push(this.transformToEntity(categoryDTO[i]));
    }
    return entityAll;
  }
}

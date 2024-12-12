import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from 'src/Shoope.Domain/Repositories/ICategoryRepository';
import { PrismaService } from '../Context/Database/PrismaService';
import { Category } from 'src/Shoope.Domain/Entities/Category';

@Injectable()
export class CategoryRepository extends ICategoryRepository {
  constructor(private _prisma: PrismaService) {
    super();
  }

  async GetCategoriesById(categorieId: string): Promise<Category | null> {
    const categoryData = await this._prisma.category.findFirst({
      where: {
        id: categorieId,
      },
      select: {
        id: true,
        imgCategory: true,
        altValue: true,
        title: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!categoryData) {
      return null;
    }

    const category = this.mapToCategory(categoryData);

    return category;
  }

  async GetAllCategories(): Promise<Category[] | null> {
    const categoryData = await this._prisma.category.findMany({
      select: {
        id: true,
        imgCategory: true,
        altValue: true,
        title: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!categoryData) {
      return null;
    }

    const listCategory: Category[] = [];

    for (let i = 0; i < categoryData.length; i++) {
      const category = this.mapToCategory(categoryData[i]);
      listCategory.push(category);
    }

    return categoryData;
  }

  async Create(entity: Category): Promise<Category | null> {
    const categoryData = await this._prisma.category.create({
      data: {
        id: entity.id,
        imgCategory: entity.imgCategory,
        altValue: entity.altValue,
        title: entity.title,
      },
    });

    if (!categoryData) {
      return null;
    }

    const category = this.mapToCategory(categoryData);

    return category;
  }

  async Update(entity: Category): Promise<Category | null> {
    const categoryData = await this._prisma.category.update({
      where: {
        id: entity.id,
      },
      data: {
        imgCategory: entity.imgCategory,
        altValue: entity.altValue,
        title: entity.title,
      },
    });

    if (!categoryData) {
      return null;
    }

    const category = this.mapToCategory(categoryData);

    return category;
  }

  async Delete(id: string): Promise<Category | null> {
    const categoryData = await this._prisma.category.delete({
      where: {
        id: id,
      },
    });

    if (!categoryData) {
      return null;
    }

    const category = this.mapToCategory(categoryData);

    return category;
  }

  mapToCategory(categoryData: Partial<Category>): Category {
    return new Category(
      categoryData.id ?? null,
      categoryData.imgCategory ?? null,
      categoryData.altValue ?? null,
      categoryData.title ?? null,
      categoryData.createdAt ?? null,
      categoryData.updatedAt ?? null,
    );
  }
}

import { Injectable } from '@nestjs/common';
import { IProductDescriptionRepository } from 'src/Shoope.Domain/Repositories/IProductDescriptionRepository';
import { ProductDescription } from 'src/Shoope.Domain/Entities/ProductDescription';
import { PrismaService } from '../Context/Database/PrismaService';

@Injectable()
export class ProductDescriptionRepository extends IProductDescriptionRepository {
  constructor(private _prisma: PrismaService) {
    super();
  }

  async GetProductDescriptionByProductId(productId: string): Promise<ProductDescription | null> {
    const productDescriptionData = await this._prisma.productDescription.findFirst({
      where: {
        productId: productId,
      },
      select: {
        id: true,
        description: true,
        characteristics: true,
        productId: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!productDescriptionData) {
      return null;
    }

    const productDescriptionMap = this.mapToProductDescription(productDescriptionData);

    return productDescriptionMap;
  }

  async CheckWhetherItExistOrNotRegisterByProductId(
    id: string,
  ): Promise<ProductDescription | null> {
    const productDescriptionData = await this._prisma.productDescription.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        description: false,
        characteristics: false,
        productId: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!productDescriptionData) {
      return null;
    }

    const productDescriptionMap = this.mapToProductDescription(productDescriptionData);

    return productDescriptionMap;
  }

  async Create(entity: ProductDescription): Promise<ProductDescription | null> {
    const entityData = await this._prisma.productDescription.create({
      data: {
        id: entity.id,
        description: entity.description,
        characteristics: entity.characteristics,
        productId: entity.productId,
      },
    });

    if (!entityData) {
      return null;
    }

    const entityMap = this.mapToProductDescription(entityData);

    return entityMap;
  }

  async Update(entity: ProductDescription): Promise<ProductDescription | null> {
    const entityData = await this._prisma.productDescription.create({
      data: {
        description: entity.description,
        characteristics: entity.characteristics,
        productId: entity.productId,
      },
    });

    if (!entityData) {
      return null;
    }

    const entityMap = this.mapToProductDescription(entityData);

    return entityMap;
  }

  async Delete(id: string): Promise<ProductDescription | null> {
    const entityData = await this._prisma.productDescription.delete({
      where: { id: id },
    });

    if (!entityData) {
      return null;
    }

    const entityMap = this.mapToProductDescription(entityData);

    return entityMap;
  }

  mapToProductDescription(productDescriptionData: Partial<ProductDescription>): ProductDescription {
    return new ProductDescription(
      productDescriptionData.id ?? null,
      productDescriptionData.description ?? null,
      productDescriptionData.characteristics ?? null,
      productDescriptionData.productId ?? null,
      productDescriptionData.createdAt ?? null,
      productDescriptionData.updatedAt ?? null,
    );
  }
}

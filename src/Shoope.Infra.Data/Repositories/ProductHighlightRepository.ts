import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Context/Database/PrismaService';
import { IProductHighlightRepository } from 'src/Shoope.Domain/Repositories/IProductHighlightRepository';
import { ProductHighlight } from 'src/Shoope.Domain/Entities/ProductHighlight';

@Injectable()
export class ProductHighlightRepository extends IProductHighlightRepository {
  constructor(private _prisma: PrismaService) {
    super();
  }

  async GetProductHighlightById(productHighlightId: string): Promise<ProductHighlight | null> {
    const productHighlightData = await this._prisma.productHighlight.findFirst({
      where: {
        id: productHighlightId,
      },
      select: {
        id: true,
        title: true,
        imgProduct: true,
        imgTop: true,
        quantitySold: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!productHighlightData) {
      return null;
    }

    const entity = this.mapToEntity(productHighlightData);

    return entity;
  }

  async GetAllProductHighlight(): Promise<ProductHighlight[] | null> {
    const productHighlightData = await this._prisma.productHighlight.findMany({
      select: {
        id: true,
        title: true,
        imgProduct: true,
        imgTop: true,
        quantitySold: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!productHighlightData) {
      return null;
    }

    const productHighlightList: ProductHighlight[] = [];

    for (let i = 0; i < productHighlightData.length; i++) {
      const element = this.mapToEntity(productHighlightData[i]);
      productHighlightList.push(element);
    }

    return productHighlightList;
  }

  async Create(entity: ProductHighlight): Promise<ProductHighlight | null> {
    const productHighlightData = await this._prisma.productHighlight.create({
      data: {
        id: entity.id,
        title: entity.title,
        imgProduct: entity.imgProduct,
        imgTop: entity.imgTop,
        quantitySold: entity.quantitySold,
      },
    });

    if (!productHighlightData) {
      return null;
    }

    const entityCreated = this.mapToEntity(productHighlightData);

    return entityCreated;
  }

  async Update(entity: ProductHighlight): Promise<ProductHighlight | null> {
    const productHighlightData = await this._prisma.productHighlight.update({
      where: {
        id: entity.id,
      },
      data: {
        title: entity.title,
        imgProduct: entity.imgProduct,
        imgTop: entity.imgTop,
        quantitySold: entity.quantitySold,
      },
    });

    if (!productHighlightData) {
      return null;
    }

    const entityUpdated = this.mapToEntity(productHighlightData);

    return entityUpdated;
  }

  async Delete(id: string): Promise<ProductHighlight | null> {
    const productHighlightData = await this._prisma.productHighlight.delete({
      where: { id: id },
    });

    if (!productHighlightData) {
      return null;
    }

    const entityDeleted = this.mapToEntity(productHighlightData);

    return entityDeleted;
  }

  mapToEntity(entityData: Partial<ProductHighlight>): ProductHighlight {
    return new ProductHighlight(
      entityData.id ?? null,
      entityData.title ?? null,
      entityData.imgProduct ?? null,
      entityData.imgTop ?? null,
      entityData.quantitySold ?? null,
      entityData.createdAt ?? null,
      entityData.updatedAt ?? null,
    );
  }
}

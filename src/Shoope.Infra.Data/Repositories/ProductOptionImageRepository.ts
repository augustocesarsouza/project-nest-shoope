import { Injectable } from '@nestjs/common';
import { ProductOptionImage } from 'src/Shoope.Domain/Entities/ProductOptionImage';
import { IProductOptionImageRepository } from 'src/Shoope.Domain/Repositories/IProductOptionImageRepository';
import { PrismaService } from '../Context/Database/PrismaService';

@Injectable()
export class ProductOptionImageRepository extends IProductOptionImageRepository {
  constructor(private _prisma: PrismaService) {
    super();
  }

  async GetByListFlashSaleProductImageAllId(
    productsOfferFlashId: string,
  ): Promise<ProductOptionImage[] | null> {
    const entityDataList = await this._prisma.productOptionImage.findMany({
      where: {
        productsOfferFlashId: productsOfferFlashId,
      },
      select: {
        id: true,
        optionType: true,
        imgAlt: true,
        imageUrl: true,
        titleOptionType: true,
        productsOfferFlashId: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!entityDataList) {
      return null;
    }

    const productOptionImageList: ProductOptionImage[] = [];

    for (let i = 0; i < entityDataList.length; i++) {
      const element = this.mapToEntity(entityDataList[i]);
      productOptionImageList.push(element);
    }

    return productOptionImageList;
  }

  async GetAllByProductsOfferFlashId(
    productsOfferFlashId: string,
  ): Promise<ProductOptionImage[] | null> {
    const entityDataList = await this._prisma.productOptionImage.findMany({
      where: {
        productsOfferFlashId: productsOfferFlashId,
      },
      select: {
        id: true,
        optionType: true,
        imgAlt: true,
        imageUrl: true,
        titleOptionType: true,
        productsOfferFlashId: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!entityDataList) {
      return null;
    }

    const productOptionImageList: ProductOptionImage[] = [];

    for (let i = 0; i < entityDataList.length; i++) {
      const element = this.mapToEntity(entityDataList[i]);
      productOptionImageList.push(element);
    }

    return productOptionImageList;
  }

  async Create(entity: ProductOptionImage): Promise<ProductOptionImage | null> {
    const productOptionImageData = await this._prisma.productOptionImage.create({
      data: {
        id: entity.id,
        optionType: entity.optionType,
        imgAlt: entity.imgAlt,
        imageUrl: entity.imageUrl,
        titleOptionType: entity.titleOptionType,
        productsOfferFlashId: entity.productsOfferFlashId,
      },
    });

    if (!productOptionImageData) {
      return null;
    }

    const entityCreated = this.mapToEntity(productOptionImageData);

    return entityCreated;
  }

  async Update(entity: ProductOptionImage): Promise<ProductOptionImage | null> {
    const productOptionImageData = await this._prisma.productOptionImage.update({
      where: {
        id: entity.id,
      },
      data: {
        optionType: entity.optionType,
        imgAlt: entity.imgAlt,
        imageUrl: entity.imageUrl,
        titleOptionType: entity.titleOptionType,
        productsOfferFlashId: entity.productsOfferFlashId,
      },
    });

    if (!productOptionImageData) {
      return null;
    }

    const entityUpdated = this.mapToEntity(productOptionImageData);

    return entityUpdated;
  }

  async Delete(id: string): Promise<ProductOptionImage | null> {
    const productOptionImageData = await this._prisma.productOptionImage.delete({
      where: { id: id },
    });

    if (!productOptionImageData) {
      return null;
    }

    const entityDeleted = this.mapToEntity(productOptionImageData);

    return entityDeleted;
  }

  mapToEntity(entityData: Partial<ProductOptionImage>): ProductOptionImage {
    return new ProductOptionImage(
      entityData.id ?? null,
      entityData.optionType ?? null,
      entityData.imgAlt ?? null,
      entityData.imageUrl ?? null,
      entityData.titleOptionType ?? null,
      entityData.productsOfferFlashId ?? null,
      entityData.createdAt ?? null,
      entityData.updatedAt ?? null,
    );
  }
}

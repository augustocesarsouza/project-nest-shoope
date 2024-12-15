import { Injectable } from '@nestjs/common';
import { ProductsOfferFlash } from 'src/Shoope.Domain/Entities/ProductsOfferFlash';
import { IProductsOfferFlashRepository } from 'src/Shoope.Domain/Repositories/IProductsOfferFlashRepository';
import { PrismaService } from '../Context/Database/PrismaService';

@Injectable()
export class ProductsOfferFlashRepository extends IProductsOfferFlashRepository {
  constructor(private _prisma: PrismaService) {
    super();
  }

  async GetByProductsOfferFlashId(
    productsOfferFlashId: string,
  ): Promise<ProductsOfferFlash | null> {
    const productsOfferFlashData = await this._prisma.productsOfferFlash.findFirst({
      where: {
        id: productsOfferFlashId,
      },
      select: {
        id: true,
        imgProduct: true,
        altValue: false,
        imgPartBottom: false,
        priceProduct: false,
        popularityPercentage: false,
        discountPercentage: false,
        hourFlashOffer: false,
        title: false,
        tagProduct: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!productsOfferFlashData) {
      return null;
    }

    const productsOfferFlash: ProductsOfferFlash = this.mapToEntity(productsOfferFlashData);

    return productsOfferFlash;
  }

  async GetAllProduct(): Promise<ProductsOfferFlash[] | null> {
    const productsOfferFlashData = await this._prisma.productsOfferFlash.findMany({
      select: {
        id: true,
        imgProduct: true,
        altValue: true,
        imgPartBottom: true,
        priceProduct: true,
        popularityPercentage: true,
        discountPercentage: true,
        hourFlashOffer: true,
        title: true,
        tagProduct: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!productsOfferFlashData) {
      return null;
    }

    const productsOfferFlash: ProductsOfferFlash[] = [];

    for (let i = 0; i < productsOfferFlashData.length; i++) {
      productsOfferFlash.push(this.mapToEntity(productsOfferFlashData[i]));
    }

    return productsOfferFlash;
  }

  async GetAllByTagProduct(
    hourFlashOffer: string,
    tagProduct: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<ProductsOfferFlash[] | null> {
    const productsOfferFlashData = await this._prisma.productsOfferFlash.findMany({
      where: {
        tagProduct: tagProduct,
        hourFlashOffer: hourFlashOffer,
      },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        imgProduct: true,
        altValue: true,
        imgPartBottom: true,
        priceProduct: true,
        popularityPercentage: true,
        discountPercentage: true,
        hourFlashOffer: true,
        title: true,
        tagProduct: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!productsOfferFlashData) {
      return null;
    }

    const productsOfferFlash: ProductsOfferFlash[] = [];

    for (let i = 0; i < productsOfferFlashData.length; i++) {
      productsOfferFlash.push(this.mapToEntity(productsOfferFlashData[i]));
    }

    return productsOfferFlash;
  }

  async Create(entity: ProductsOfferFlash): Promise<ProductsOfferFlash | null> {
    const productsOfferFlashData = await this._prisma.productsOfferFlash.create({
      data: {
        id: entity.id,
        imgProduct: entity.imgProduct,
        altValue: entity.altValue,
        imgPartBottom: entity.imgPartBottom,
        priceProduct: entity.priceProduct,
        popularityPercentage: entity.popularityPercentage,
        discountPercentage: entity.discountPercentage,
        hourFlashOffer: entity.hourFlashOffer,
        title: entity.title,
        tagProduct: entity.tagProduct,
      },
    });

    if (!productsOfferFlashData) {
      return null;
    }

    const productsOfferFlash = this.mapToEntity(productsOfferFlashData);

    return productsOfferFlash;
  }

  async Update(entity: ProductsOfferFlash): Promise<ProductsOfferFlash | null> {
    const productsOfferFlashData = await this._prisma.productsOfferFlash.update({
      where: {
        id: entity.id,
      },
      data: {
        imgProduct: entity.imgProduct,
        altValue: entity.altValue,
        imgPartBottom: entity.imgPartBottom,
        priceProduct: entity.priceProduct,
        popularityPercentage: entity.popularityPercentage,
        discountPercentage: entity.discountPercentage,
        hourFlashOffer: entity.hourFlashOffer,
        title: entity.title,
        tagProduct: entity.tagProduct,
      },
    });

    if (!productsOfferFlashData) {
      return null;
    }

    const productsOfferFlash = this.mapToEntity(productsOfferFlashData);

    return productsOfferFlash;
  }

  async Delete(id: string): Promise<ProductsOfferFlash | null> {
    const productsOfferFlashData = await this._prisma.productsOfferFlash.delete({
      where: { id: id },
    });

    if (!productsOfferFlashData) {
      return null;
    }

    const productsOfferFlash = this.mapToEntity(productsOfferFlashData);

    return productsOfferFlash;
  }

  mapToEntity(entityData: Partial<ProductsOfferFlash>): ProductsOfferFlash {
    return new ProductsOfferFlash(
      entityData.id ?? null,
      entityData.imgProduct ?? null,
      entityData.altValue ?? null,
      entityData.imgPartBottom ?? null,
      entityData.priceProduct ?? null,
      entityData.popularityPercentage ?? null,
      entityData.discountPercentage ?? null,
      entityData.hourFlashOffer ?? null,
      entityData.title ?? null,
      entityData.tagProduct ?? null,
      entityData.createdAt ?? null,
      entityData.updatedAt ?? null,
    );
  }
}

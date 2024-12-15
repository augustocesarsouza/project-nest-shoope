import { Injectable } from '@nestjs/common';
import { IProductDiscoveriesOfDayRepository } from 'src/Shoope.Domain/Repositories/IProductDiscoveriesOfDayRepository';
import { PrismaService } from '../Context/Database/PrismaService';
import { ProductDiscoveriesOfDay } from 'src/Shoope.Domain/Entities/ProductDiscoveriesOfDay';

@Injectable()
export class ProductDiscoveriesOfDayRepository extends IProductDiscoveriesOfDayRepository {
  constructor(private _prisma: PrismaService) {
    super();
  }

  async GetProductDiscoveriesOfDayById(
    productDiscoveriesOfDayId: string,
  ): Promise<ProductDiscoveriesOfDay | null> {
    const productDiscoveriesOfDayData = await this._prisma.productDiscoveriesOfDay.findFirst({
      where: {
        id: productDiscoveriesOfDayId,
      },
      select: {
        id: true,
        title: true,
        imgProduct: true,
        imgPartBottom: true,
        discountPercentage: true,
        isAd: true,
        price: true,
        quantitySold: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!productDiscoveriesOfDayData) {
      return null;
    }

    const productDiscoveriesOfDay = this.mapToEntity(productDiscoveriesOfDayData);

    return productDiscoveriesOfDay;
  }

  async GetAllProductDiscoveriesOfDay(): Promise<ProductDiscoveriesOfDay[] | null> {
    const productDiscoveriesOfDayData = await this._prisma.productDiscoveriesOfDay.findMany({
      select: {
        id: true,
        title: true,
        imgProduct: true,
        imgPartBottom: true,
        discountPercentage: true,
        isAd: true,
        price: true,
        quantitySold: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!productDiscoveriesOfDayData) {
      return null;
    }

    const productDiscoveriesOfDayList: ProductDiscoveriesOfDay[] = [];

    for (let i = 0; i < productDiscoveriesOfDayData.length; i++) {
      productDiscoveriesOfDayList.push(this.mapToEntity(productDiscoveriesOfDayData[i]));
    }

    return productDiscoveriesOfDayList;
  }

  async CheckWheterItExistProductDiscoveriesOfDay(
    id: string,
  ): Promise<ProductDiscoveriesOfDay | null> {
    const productDiscoveriesOfDayData = await this._prisma.productDiscoveriesOfDay.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: false,
        imgProduct: true,
        imgPartBottom: false,
        discountPercentage: false,
        isAd: false,
        price: false,
        quantitySold: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!productDiscoveriesOfDayData) {
      return null;
    }

    const productDiscoveriesOfDay = this.mapToEntity(productDiscoveriesOfDayData);

    return productDiscoveriesOfDay;
  }

  async Create(entity: ProductDiscoveriesOfDay): Promise<ProductDiscoveriesOfDay | null> {
    const entityData = await this._prisma.productDiscoveriesOfDay.create({
      data: {
        id: entity.id,
        title: entity.title,
        imgProduct: entity.imgProduct,
        imgPartBottom: entity.imgPartBottom,
        discountPercentage: entity.discountPercentage,
        isAd: entity.isAd,
        price: entity.price,
        quantitySold: entity.quantitySold,
      },
    });

    if (!entityData) {
      return null;
    }

    const entityMap = this.mapToEntity(entityData);

    return entityMap;
  }

  async Update(entity: ProductDiscoveriesOfDay): Promise<ProductDiscoveriesOfDay | null> {
    const entityData = await this._prisma.productDiscoveriesOfDay.update({
      where: {
        id: entity.id,
      },
      data: {
        id: entity.id,
        title: entity.title,
        imgProduct: entity.imgProduct,
        imgPartBottom: entity.imgPartBottom,
        discountPercentage: entity.discountPercentage,
        isAd: entity.isAd,
        price: entity.price,
        quantitySold: entity.quantitySold,
      },
    });

    if (!entityData) {
      return null;
    }

    const entityMap = this.mapToEntity(entityData);

    return entityMap;
  }

  async Delete(id: string): Promise<ProductDiscoveriesOfDay | null> {
    const productDiscoveriesOfDayData = await this._prisma.productDiscoveriesOfDay.delete({
      where: { id: id },
    });

    if (!productDiscoveriesOfDayData) {
      return null;
    }

    const productDiscoveriesOfDay = this.mapToEntity(productDiscoveriesOfDayData);

    return productDiscoveriesOfDay;
  }

  mapToEntity(entityData: Partial<ProductDiscoveriesOfDay>): ProductDiscoveriesOfDay {
    return new ProductDiscoveriesOfDay(
      entityData.id ?? null,
      entityData.title ?? null,
      entityData.imgProduct ?? null,
      entityData.imgPartBottom ?? null,
      entityData.discountPercentage ?? null,
      entityData.isAd ?? null,
      entityData.price ?? null,
      entityData.quantitySold ?? null,
      entityData.createdAt ?? null,
      entityData.updatedAt ?? null,
    );
  }
}

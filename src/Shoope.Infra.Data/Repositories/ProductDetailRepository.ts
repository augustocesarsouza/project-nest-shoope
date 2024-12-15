import { Injectable } from '@nestjs/common';
import { IProductDetailRepository } from 'src/Shoope.Domain/Repositories/IProductDetailRepository';
import { PrismaService } from '../Context/Database/PrismaService';
import { ProductDetail } from 'src/Shoope.Domain/Entities/ProductDetail';

@Injectable()
export class ProductDetailRepository extends IProductDetailRepository {
  constructor(private _prisma: PrismaService) {
    super();
  }

  async GetProductDetailByProductId(productId: string): Promise<ProductDetail | null> {
    const productDetailData = await this._prisma.productDetail.findFirst({
      where: {
        productId: productId,
      },
      select: {
        id: true,
        promotionalStock: true,
        totalStock: true,
        sendingOf: true,
        mark: true,
        gender: true,
        warrantlyDuration: true,
        warrantlyType: true,
        productWeight: true,
        energyConsumption: true,
        amount: true,
        material: true,
        productId: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!productDetailData) {
      return null;
    }

    const cupon = this.mapToEntity(productDetailData);

    return cupon;
  }

  async CheckWheterItExistProductDetail(id: string): Promise<ProductDetail | null> {
    const productDetailData = await this._prisma.productDetail.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        promotionalStock: true,
        totalStock: false,
        sendingOf: false,
        mark: false,
        gender: false,
        warrantlyDuration: false,
        warrantlyType: false,
        productWeight: false,
        energyConsumption: false,
        amount: false,
        material: false,
        productId: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!productDetailData) {
      return null;
    }

    const cupon = this.mapToEntity(productDetailData);

    return cupon;
  }

  async Create(entity: ProductDetail): Promise<ProductDetail | null> {
    const productDetailData = await this._prisma.productDetail.create({
      data: {
        id: entity.id,
        promotionalStock: entity.promotionalStock,
        totalStock: entity.totalStock,
        sendingOf: entity.sendingOf,
        mark: entity.mark,
        gender: entity.gender,
        warrantlyDuration: entity.warrantlyDuration,
        warrantlyType: entity.warrantlyType,
        productWeight: entity.productWeight,
        energyConsumption: entity.energyConsumption,
        amount: entity.amount,
        material: entity.material,
        productId: entity.productId,
      },
    });

    if (!productDetailData) {
      return null;
    }

    const productDetail = this.mapToEntity(productDetailData);

    return productDetail;
  }

  async Update(entity: ProductDetail): Promise<ProductDetail | null> {
    const productDetailData = await this._prisma.productDetail.update({
      where: {
        id: entity.id,
      },
      data: {
        promotionalStock: entity.promotionalStock,
        totalStock: entity.totalStock,
        sendingOf: entity.sendingOf,
        mark: entity.mark,
        gender: entity.gender,
        warrantlyDuration: entity.warrantlyDuration,
        warrantlyType: entity.warrantlyType,
        productWeight: entity.productWeight,
        energyConsumption: entity.energyConsumption,
        amount: entity.amount,
        material: entity.material,
        productId: entity.productId,
      },
    });

    if (!productDetailData) {
      return null;
    }

    const productDetail = this.mapToEntity(productDetailData);

    return productDetail;
  }

  async Delete(id: string): Promise<ProductDetail | null> {
    const productDetailData = await this._prisma.productDetail.delete({
      where: { id: id },
    });

    if (!productDetailData) {
      return null;
    }

    const productDetail = this.mapToEntity(productDetailData);

    return productDetail;
  }

  mapToEntity(entityData: Partial<ProductDetail>): ProductDetail {
    return new ProductDetail(
      entityData.id ?? null,
      entityData.promotionalStock ?? null,
      entityData.totalStock ?? null,
      entityData.sendingOf ?? null,
      entityData.mark ?? null,
      entityData.gender ?? null,
      entityData.warrantlyDuration ?? null,
      entityData.warrantlyType ?? null,
      entityData.productWeight ?? null,
      entityData.energyConsumption ?? null,
      entityData.amount ?? null,
      entityData.material ?? null,
      entityData.productId ?? null,
      entityData.createdAt ?? null,
      entityData.updatedAt ?? null,
    );
  }
}

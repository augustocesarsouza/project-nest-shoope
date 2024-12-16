import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Context/Database/PrismaService';
import { IProductSellerRepository } from 'src/Shoope.Domain/Repositories/IProductSellerRepository';
import { ProductSeller } from 'src/Shoope.Domain/Entities/ProductSeller';
import { UserSellerProduct } from 'src/Shoope.Domain/Entities/UserSellerProduct';
import { DateTime } from 'luxon';

@Injectable()
export class ProductSellerRepository extends IProductSellerRepository {
  constructor(private _prisma: PrismaService) {
    super();
  }

  async GetById(productId: string): Promise<ProductSeller | null> {
    const entityData = await this._prisma.productSeller.findFirst({
      where: {
        productId: productId,
      },
      select: {
        id: true,
        userSellerProductId: false,
        userSellerProduct: {
          select: {
            name: true,
            imgPerfil: true,
            imgFloating: true,
            lastLogin: true,
            reviews: true,
            chatResponseRate: true,
            accountCreationDate: true,
            quantityOfProductSold: true,
            usuallyRespondsToChatIn: true,
            followers: true,
          },
        },
        productId: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!entityData) {
      return null;
    }

    const productSellerNew = new ProductSeller(
      entityData.id ?? null,
      null,
      entityData.userSellerProduct
        ? this.mapToUserSellerProduct(entityData.userSellerProduct)
        : null,
      null,
      null,
    );

    // const productSeller = this.mapToEntity(productSellerNew);

    return productSellerNew;
  }

  async CheckIfExistRegisterById(id: string): Promise<ProductSeller | null> {
    const entityData = await this._prisma.productSeller.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        userSellerProductId: false,
        userSellerProduct: {
          select: {
            name: true,
            imgPerfil: false,
            imgFloating: false,
            lastLogin: false,
            reviews: false,
            chatResponseRate: false,
            accountCreationDate: false,
            quantityOfProductSold: false,
            usuallyRespondsToChatIn: false,
            followers: false,
          },
        },
        productId: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!entityData) {
      return null;
    }

    const productSellerNew = new ProductSeller(
      entityData.id ?? null,
      null,
      entityData.userSellerProduct
        ? this.mapToUserSellerProduct(entityData.userSellerProduct)
        : null,
      null,
      null,
    );

    // const productSeller = this.mapToEntity(productSellerNew);

    return productSellerNew;
  }

  async CheckIfExistRegisterByUserSellerProductId(
    userSellerProductId: string,
  ): Promise<ProductSeller | null> {
    const entityData = await this._prisma.productSeller.findFirst({
      where: {
        userSellerProductId: userSellerProductId,
      },
      select: {
        id: true,
        userSellerProductId: false,
        userSellerProduct: {
          select: {
            name: true,
            imgPerfil: false,
            imgFloating: false,
            lastLogin: false,
            reviews: false,
            chatResponseRate: false,
            accountCreationDate: false,
            quantityOfProductSold: false,
            usuallyRespondsToChatIn: false,
            followers: false,
          },
        },
        productId: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!entityData) {
      return null;
    }

    const productSellerNew = new ProductSeller(
      entityData.id ?? null,
      null,
      entityData.userSellerProduct
        ? this.mapToUserSellerProduct(entityData.userSellerProduct)
        : null,
      null,
      null,
    );

    // const productSeller = this.mapToEntity(productSellerNew);

    return productSellerNew;
  }

  async Create(entity: ProductSeller): Promise<ProductSeller | null> {
    const productSellerData = await this._prisma.productSeller.create({
      data: {
        id: entity.id,
        userSellerProductId: entity.userSellerProductId,
        productId: entity.productId,
      },
    });

    if (!productSellerData) {
      return null;
    }

    const entityCreated = this.mapToEntity(productSellerData);

    return entityCreated;
  }

  async Update(entity: ProductSeller): Promise<ProductSeller | null> {
    const productSellerData = await this._prisma.productSeller.update({
      where: {
        id: entity.id,
      },
      data: {
        userSellerProductId: entity.userSellerProductId,
        productId: entity.productId,
      },
    });

    if (!productSellerData) {
      return null;
    }

    const entityUpdated = this.mapToEntity(productSellerData);

    return entityUpdated;
  }

  async Delete(id: string): Promise<ProductSeller | null> {
    const productSellerData = await this._prisma.productSeller.delete({
      where: { id: id },
    });

    if (!productSellerData) {
      return null;
    }

    const entityDeleted = this.mapToEntity(productSellerData);

    return entityDeleted;
  }

  mapToEntity(entityData: Partial<ProductSeller>): ProductSeller {
    return new ProductSeller(
      entityData.id ?? null,
      entityData.userSellerProductId ?? null,
      entityData.userSellerProduct ?? null,
      entityData.productId ?? null,
      entityData.createdAt ?? null,
      entityData.updatedAt ?? null,
    );
  }

  mapToUserSellerProduct(userData: Partial<UserSellerProduct>): UserSellerProduct {
    const brazilTimeZone = 'America/Campo_Grande';

    const accountCreationDate = userData.accountCreationDate
      ? DateTime.fromJSDate(userData.accountCreationDate, { zone: 'utc' })
          .setZone(brazilTimeZone)
          .toISO({ includeOffset: true })
      : null;

    const lastLogin = userData.lastLogin
      ? DateTime.fromJSDate(userData.lastLogin, { zone: 'utc' })
          .setZone(brazilTimeZone)
          .toISO({ includeOffset: true })
      : null;

    const userSellerProduct = new UserSellerProduct(
      userData.id ?? null,
      userData.name ?? null,
      userData.imgPerfil ?? null,
      userData.imgFloating ?? null,
      lastLogin,
      userData.reviews ?? null,
      userData.chatResponseRate ?? null,
      accountCreationDate,
      userData.quantityOfProductSold ?? null,
      userData.usuallyRespondsToChatIn ?? null,
      userData.followers ?? null,
    );

    return userSellerProduct;
  }
}

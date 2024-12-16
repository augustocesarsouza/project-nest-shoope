import { Injectable } from '@nestjs/common';
import { UserSellerProduct } from 'src/Shoope.Domain/Entities/UserSellerProduct';
import { IUserSellerProductRepository } from 'src/Shoope.Domain/Repositories/IUserSellerProductRepository';
import { PrismaService } from '../Context/Database/PrismaService';

@Injectable()
export class UserSellerProductRepository extends IUserSellerProductRepository {
  constructor(private _prisma: PrismaService) {
    super();
  }

  async GetById(userSellerProductId: string): Promise<UserSellerProduct | null> {
    const entityData = await this._prisma.userSellerProduct.findFirst({
      where: {
        id: userSellerProductId,
      },
      select: {
        id: true,
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
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!entityData) {
      return null;
    }

    const userSellerProduct = this.mapToEntity(entityData);

    return userSellerProduct;
  }

  async CheckIfExistRegisterById(id: string): Promise<UserSellerProduct | null> {
    const entityData = await this._prisma.userSellerProduct.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        imgPerfil: true,
        imgFloating: true,
        lastLogin: false,
        reviews: false,
        chatResponseRate: false,
        accountCreationDate: false,
        quantityOfProductSold: false,
        usuallyRespondsToChatIn: false,
        followers: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!entityData) {
      return null;
    }

    const productSeller = this.mapToEntity(entityData);

    return productSeller;
  }

  async Create(entity: UserSellerProduct): Promise<UserSellerProduct | null> {
    const userSellerProductData = await this._prisma.userSellerProduct.create({
      data: {
        id: entity.id,
        name: entity.name,
        imgPerfil: entity.imgPerfil,
        imgFloating: entity.imgFloating,
        lastLogin: entity.lastLogin,
        reviews: entity.reviews,
        chatResponseRate: entity.chatResponseRate,
        accountCreationDate: entity.accountCreationDate,
        quantityOfProductSold: entity.quantityOfProductSold,
        usuallyRespondsToChatIn: entity.usuallyRespondsToChatIn,
        followers: entity.followers,
      },
    });

    if (!userSellerProductData) {
      return null;
    }

    const entityCreated = this.mapToEntity(userSellerProductData);

    return entityCreated;
  }

  async Update(entity: UserSellerProduct): Promise<UserSellerProduct | null> {
    const userSellerProductData = await this._prisma.userSellerProduct.update({
      where: {
        id: entity.id,
      },
      data: {
        name: entity.name,
        imgPerfil: entity.imgPerfil,
        imgFloating: entity.imgFloating,
        lastLogin: entity.lastLogin,
        reviews: entity.reviews,
        chatResponseRate: entity.chatResponseRate,
        accountCreationDate: entity.accountCreationDate,
        quantityOfProductSold: entity.quantityOfProductSold,
        usuallyRespondsToChatIn: entity.usuallyRespondsToChatIn,
        followers: entity.followers,
      },
    });

    if (!userSellerProductData) {
      return null;
    }

    const entityUpdated = this.mapToEntity(userSellerProductData);

    return entityUpdated;
  }

  async Delete(id: string): Promise<UserSellerProduct | null> {
    const userSellerProductData = await this._prisma.userSellerProduct.delete({
      where: { id: id },
    });

    if (!userSellerProductData) {
      return null;
    }

    const entityDeleted = this.mapToEntity(userSellerProductData);

    return entityDeleted;
  }

  mapToEntity(entityData: Partial<UserSellerProduct>): UserSellerProduct {
    return new UserSellerProduct(
      entityData.id ?? null,
      entityData.name ?? null,
      entityData.imgPerfil ?? null,
      entityData.imgFloating ?? null,
      entityData.lastLogin ?? null,
      entityData.reviews ?? null,
      entityData.chatResponseRate ?? null,
      entityData.accountCreationDate ?? null,
      entityData.quantityOfProductSold ?? null,
      entityData.usuallyRespondsToChatIn ?? null,
      entityData.followers ?? null,
      entityData.createdAt ?? null,
      entityData.updatedAt ?? null,
    );
  }
}

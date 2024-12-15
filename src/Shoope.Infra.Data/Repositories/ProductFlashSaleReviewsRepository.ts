import { Injectable } from '@nestjs/common';
import { IProductFlashSaleReviewsRepository } from 'src/Shoope.Domain/Repositories/IProductFlashSaleReviewsRepository';
import { PrismaService } from '../Context/Database/PrismaService';
import { ProductFlashSaleReviews } from 'src/Shoope.Domain/Entities/ProductFlashSaleReviews';
import { User } from 'src/Shoope.Domain/Entities/User';

@Injectable()
export class ProductFlashSaleReviewsRepository extends IProductFlashSaleReviewsRepository {
  constructor(private _prisma: PrismaService) {
    super();
  }

  async GetByProductFlashSaleId(
    productFlashSaleReviewsId: string,
  ): Promise<ProductFlashSaleReviews | null> {
    const productFlashSaleReviewsData = await this._prisma.productFlashSaleReviews.findFirst({
      where: {
        id: productFlashSaleReviewsId,
      },
      select: {
        id: true,
        message: true,
        creationDate: true,
        costBenefit: true,
        similarToAd: true,
        starQuantity: true,
        productsOfferFlashId: true,
        userId: true,
        user: false,
        imgAndVideoReviewsProduct: true,
        variation: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!productFlashSaleReviewsData) {
      return null;
    }

    const productFlashSaleReviews = this.mapToEntity(productFlashSaleReviewsData);

    return productFlashSaleReviews;
  }

  async GetAllProductFlashSaleReviewsByProductFlashSaleId(
    productFlashSaleId: string,
  ): Promise<ProductFlashSaleReviews[] | null> {
    const productFlashSaleReviewsData = await this._prisma.productFlashSaleReviews.findMany({
      where: {
        productsOfferFlashId: productFlashSaleId,
      },
      select: {
        id: true,
        message: true,
        creationDate: true,
        costBenefit: true,
        similarToAd: true,
        starQuantity: true,
        productsOfferFlashId: false,
        userId: false,
        user: {
          select: {
            id: false,
            name: true,
            email: false,
            gender: false,
            phone: false,
            passwordHash: false,
            salt: false,
            cpf: false,
            birthDate: false,
            userImage: true,
          },
        },
        imgAndVideoReviewsProduct: true,
        variation: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!productFlashSaleReviewsData) {
      return null;
    }

    const productFlashSaleReviewsList: ProductFlashSaleReviews[] = [];

    for (let i = 0; i < productFlashSaleReviewsData.length; i++) {
      const element = productFlashSaleReviewsData[i];
      const productDiscoveriesOfDay = new ProductFlashSaleReviews(
        element.id,
        element.message,
        element.creationDate,
        element.costBenefit,
        element.similarToAd,
        element.starQuantity,
        null,
        null,
        this.mapToUser(element.user),
        element.imgAndVideoReviewsProduct,
        element.variation,
        null,
        null,
      );

      productFlashSaleReviewsList.push(productDiscoveriesOfDay);
    }

    return productFlashSaleReviewsList;
  }

  async CheckWheterItExistProductFlashSaleReviews(
    id: string,
  ): Promise<ProductFlashSaleReviews | null> {
    const productFlashSaleReviewsData = await this._prisma.productFlashSaleReviews.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        message: false,
        creationDate: false,
        costBenefit: false,
        similarToAd: false,
        starQuantity: false,
        productsOfferFlashId: false,
        userId: false,
        user: false,
        imgAndVideoReviewsProduct: true,
        variation: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!productFlashSaleReviewsData) {
      return null;
    }

    const productFlashSaleReviews = this.mapToEntity(productFlashSaleReviewsData);

    return productFlashSaleReviews;
  }

  async Create(entity: ProductFlashSaleReviews): Promise<ProductFlashSaleReviews | null> {
    const entityData = await this._prisma.productFlashSaleReviews.create({
      data: {
        id: entity.id,
        message: entity.message,
        creationDate: entity.creationDate,
        costBenefit: entity.costBenefit,
        similarToAd: entity.similarToAd,
        starQuantity: entity.starQuantity,
        productsOfferFlashId: entity.productsOfferFlashId,
        userId: entity.userId,
        imgAndVideoReviewsProduct: entity.imgAndVideoReviewsProduct,
        variation: entity.variation,
      },
    });

    if (!entityData) {
      return null;
    }

    const entityMap = this.mapToEntity(entityData);

    return entityMap;
  }

  async Update(entity: ProductFlashSaleReviews): Promise<ProductFlashSaleReviews | null> {
    const entityData = await this._prisma.productFlashSaleReviews.update({
      where: {
        id: entity.id,
      },
      data: {
        message: entity.message,
        creationDate: entity.creationDate,
        costBenefit: entity.costBenefit,
        similarToAd: entity.similarToAd,
        starQuantity: entity.starQuantity,
        productsOfferFlashId: entity.productsOfferFlashId,
        userId: entity.userId,
        imgAndVideoReviewsProduct: entity.imgAndVideoReviewsProduct,
        variation: entity.variation,
      },
    });

    if (!entityData) {
      return null;
    }

    const entityMap = this.mapToEntity(entityData);

    return entityMap;
  }

  async Delete(id: string): Promise<ProductFlashSaleReviews | null> {
    const productDiscoveriesOfDayData = await this._prisma.productFlashSaleReviews.delete({
      where: { id: id },
    });

    if (!productDiscoveriesOfDayData) {
      return null;
    }

    const productDiscoveriesOfDay = this.mapToEntity(productDiscoveriesOfDayData);

    return productDiscoveriesOfDay;
  }

  mapToEntity(entityData: Partial<ProductFlashSaleReviews>): ProductFlashSaleReviews {
    return new ProductFlashSaleReviews(
      entityData.id ?? null,
      entityData.message ?? null,
      entityData.creationDate ?? null,
      entityData.costBenefit ?? null,
      entityData.similarToAd ?? null,
      entityData.starQuantity ?? null,
      entityData.productsOfferFlashId ?? null,
      entityData.userId ?? null,
      entityData.user ?? null,
      entityData.imgAndVideoReviewsProduct ?? null,
      entityData.variation ?? null,
      entityData.createdAt ?? null,
      entityData.updatedAt ?? null,
    );
  }

  mapToUser(userData: Partial<User>): User {
    return new User(
      userData.id ?? null,
      userData.name ?? null,
      userData.email ?? null,
      userData.gender ?? null,
      userData.phone ?? null,
      userData.passwordHash ?? null,
      userData.salt ?? null,
      userData.cpf ?? null,
      userData.birthDate ?? null,
      userData.userImage ?? null,
    );
  }
}

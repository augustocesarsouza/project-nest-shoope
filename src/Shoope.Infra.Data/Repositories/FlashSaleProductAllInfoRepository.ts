import { Injectable } from '@nestjs/common';
import { IFlashSaleProductAllInfoRepository } from 'src/Shoope.Domain/Repositories/IFlashSaleProductAllInfo';
import { PrismaService } from '../Context/Database/PrismaService';
import { FlashSaleProductAllInfo } from 'src/Shoope.Domain/Entities/FlashSaleProductAllInfo';
import { ProductsOfferFlash } from 'src/Shoope.Domain/Entities/ProductsOfferFlash';

@Injectable()
export class FlashSaleProductAllInfoRepository extends IFlashSaleProductAllInfoRepository {
  constructor(private _prisma: PrismaService) {
    super();
  }

  async GetFlashSaleProductAllInfoById(
    productsOfferFlashId: string,
  ): Promise<FlashSaleProductAllInfo | null> {
    const flashSaleProductAllInfoData = await this._prisma.flashSaleProductAllInfo.findFirst({
      where: {
        id: productsOfferFlashId,
      },
      select: {
        id: true,
        productsOfferFlashId: false,
        productReviewsRate: false,
        quantitySold: true,
        favoriteQuantity: false,
        quantityAvaliation: false,
        coins: false,
        creditCard: false,
        voltage: false,
        quantityPiece: false,
        size: false,
        productHaveInsurance: false,
        productsOfferFlash: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!flashSaleProductAllInfoData) {
      return null;
    }

    const flashSaleProductAllInfo = this.mapToEntity(flashSaleProductAllInfoData);

    return flashSaleProductAllInfo;
  }

  async GetFlashSaleProductByProductFlashSaleId(
    productFlashSaleId: string,
  ): Promise<FlashSaleProductAllInfo | null> {
    const flashSaleProductAllInfoData = await this._prisma.flashSaleProductAllInfo.findFirst({
      where: {
        productsOfferFlashId: productFlashSaleId,
      },
      select: {
        id: true,
        productsOfferFlashId: false,
        productReviewsRate: true,
        quantitySold: true,
        favoriteQuantity: true,
        quantityAvaliation: true,
        coins: true,
        creditCard: true,
        voltage: true,
        quantityPiece: true,
        size: true,
        productHaveInsurance: true,
        productsOfferFlash: {
          select: {
            id: true,
            imgProduct: true,
            altValue: true,
            imgPartBottom: true,
            priceProduct: true,
            popularityPercentage: false,
            discountPercentage: true,
            hourFlashOffer: false,
            title: true,
            tagProduct: false,
            createdAt: false,
            updatedAt: false,
          },
        },
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!flashSaleProductAllInfoData) {
      return null;
    }

    const flashSaleProductAllInfo = new FlashSaleProductAllInfo(
      flashSaleProductAllInfoData.id ?? null,
      null,
      flashSaleProductAllInfoData.productsOfferFlash
        ? this.mapToProductsOfferFlash(flashSaleProductAllInfoData.productsOfferFlash)
        : null,
      flashSaleProductAllInfoData.productReviewsRate ?? null,
      flashSaleProductAllInfoData.quantitySold ?? null,
      flashSaleProductAllInfoData.favoriteQuantity ?? null,
      flashSaleProductAllInfoData.quantityAvaliation ?? null,
      flashSaleProductAllInfoData.coins ?? null,
      flashSaleProductAllInfoData.creditCard ?? null,
      flashSaleProductAllInfoData.voltage ?? null,
      flashSaleProductAllInfoData.quantityPiece ?? null,
      flashSaleProductAllInfoData.size ?? null,
      flashSaleProductAllInfoData.productHaveInsurance ?? null,
      null,
      null,
    );

    return flashSaleProductAllInfo;
  }

  async Create(entity: FlashSaleProductAllInfo): Promise<FlashSaleProductAllInfo | null> {
    const flashSaleProductAllInfoData = await this._prisma.flashSaleProductAllInfo.create({
      data: {
        id: entity.id,
        productsOfferFlashId: entity.productsOfferFlashId,
        productReviewsRate: entity.productReviewsRate,
        quantitySold: entity.quantitySold,
        favoriteQuantity: entity.favoriteQuantity,
        quantityAvaliation: entity.quantityAvaliation,
        coins: entity.coins,
        creditCard: entity.creditCard,
        voltage: entity.voltage,
        quantityPiece: entity.quantityPiece,
        size: entity.size,
        productHaveInsurance: entity.productHaveInsurance,
      },
    });

    if (!flashSaleProductAllInfoData) {
      return null;
    }

    const flashSaleProductAllInfo = this.mapToEntity(flashSaleProductAllInfoData);

    return flashSaleProductAllInfo;
  }

  async Update(entity: FlashSaleProductAllInfo): Promise<FlashSaleProductAllInfo | null> {
    const flashSaleProductAllInfoData = await this._prisma.flashSaleProductAllInfo.create({
      data: {
        productsOfferFlashId: entity.productsOfferFlashId,
        productReviewsRate: entity.productReviewsRate,
        quantitySold: entity.quantitySold,
        favoriteQuantity: entity.favoriteQuantity,
        quantityAvaliation: entity.quantityAvaliation,
        coins: entity.coins,
        creditCard: entity.creditCard,
        voltage: entity.voltage,
        quantityPiece: entity.quantityPiece,
        size: entity.size,
        productHaveInsurance: entity.productHaveInsurance,
      },
    });

    if (!flashSaleProductAllInfoData) {
      return null;
    }

    const flashSaleProductAllInfo = this.mapToEntity(flashSaleProductAllInfoData);

    return flashSaleProductAllInfo;
  }

  async Delete(id: string): Promise<FlashSaleProductAllInfo | null> {
    const flashSaleProductAllInfoData = await this._prisma.flashSaleProductAllInfo.delete({
      where: { id: id },
    });

    if (!flashSaleProductAllInfoData) {
      return null;
    }

    const flashSaleProductAllInfo = this.mapToEntity(flashSaleProductAllInfoData);

    return flashSaleProductAllInfo;
  }

  mapToEntity(entityData: Partial<FlashSaleProductAllInfo>): FlashSaleProductAllInfo {
    return new FlashSaleProductAllInfo(
      entityData.id ?? null,
      entityData.productsOfferFlashId ?? null,
      entityData.productsOfferFlash ?? null,
      entityData.productReviewsRate ?? null,
      entityData.quantitySold ?? null,
      entityData.favoriteQuantity ?? null,
      entityData.quantityAvaliation ?? null,
      entityData.coins ?? null,
      entityData.creditCard ?? null,
      entityData.voltage ?? null,
      entityData.quantityPiece ?? null,
      entityData.size ?? null,
      entityData.productHaveInsurance ?? null,
      entityData.createdAt ?? null,
      entityData.updatedAt ?? null,
    );
  }

  mapToProductsOfferFlash(entityData: Partial<ProductsOfferFlash>): ProductsOfferFlash {
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

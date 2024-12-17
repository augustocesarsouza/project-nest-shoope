import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Context/Database/PrismaService';
import { IPromotionRepository } from 'src/Shoope.Domain/Repositories/IPromotionRepository';
import { Promotion } from 'src/Shoope.Domain/Entities/Promotion';
import { DateTime } from 'luxon';

@Injectable()
export class PromotionRepository extends IPromotionRepository {
  constructor(private _prisma: PrismaService) {
    super();
  }

  async GetById(promotionId: string): Promise<Promotion | null> {
    const entityData = await this._prisma.promotion.findFirst({
      where: {
        id: promotionId,
      },
      select: {
        id: true,
        whatIsThePromotion: true,
        title: false,
        description: false,
        date: false,
        img: true,
        imgInnerFirst: true,
        altImgInnerFirst: true,
        imgInnerSecond: true,
        altImgInnerSecond: true,
        imgInnerThird: true,
        altImgInnerThird: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!entityData) {
      return null;
    }

    const promotion = this.mapToEntity(entityData);

    return promotion;
  }

  async CheckIfExistRegisterById(id: string): Promise<Promotion | null> {
    const entityData = await this._prisma.promotion.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        whatIsThePromotion: true,
        title: true,
        description: true,
        date: true,
        img: true,
        imgInnerFirst: true,
        altImgInnerFirst: true,
        imgInnerSecond: true,
        altImgInnerSecond: true,
        imgInnerThird: true,
        altImgInnerThird: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!entityData) {
      return null;
    }

    const promotion = this.mapToEntity(entityData);

    return promotion;
  }

  async Create(entity: Promotion): Promise<Promotion | null> {
    const promotionData = await this._prisma.promotion.create({
      data: {
        id: entity.id,
        whatIsThePromotion: entity.whatIsThePromotion,
        title: entity.title,
        description: entity.description,
        date: entity.date,
        img: entity.img,
        imgInnerFirst: entity.imgInnerFirst,
        altImgInnerFirst: entity.altImgInnerFirst,
        imgInnerSecond: entity.imgInnerSecond,
        altImgInnerSecond: entity.altImgInnerSecond,
        imgInnerThird: entity.imgInnerThird,
        altImgInnerThird: entity.altImgInnerThird,
      },
    });

    if (!promotionData) {
      return null;
    }

    const entityCreated = this.mapToEntity(promotionData);

    return entityCreated;
  }

  async Update(entity: Promotion): Promise<Promotion | null> {
    const promotionData = await this._prisma.promotion.update({
      where: {
        id: entity.id,
      },
      data: {
        whatIsThePromotion: entity.whatIsThePromotion,
        title: entity.title,
        description: entity.description,
        date: entity.date,
        img: entity.img,
        imgInnerFirst: entity.imgInnerFirst,
        altImgInnerFirst: entity.altImgInnerFirst,
        imgInnerSecond: entity.imgInnerSecond,
        altImgInnerSecond: entity.altImgInnerSecond,
        imgInnerThird: entity.imgInnerThird,
        altImgInnerThird: entity.altImgInnerThird,
      },
    });

    if (!promotionData) {
      return null;
    }

    const entityUpdated = this.mapToEntity(promotionData);

    return entityUpdated;
  }

  async Delete(id: string): Promise<Promotion | null> {
    const promotionData = await this._prisma.promotion.delete({
      where: { id: id },
    });

    if (!promotionData) {
      return null;
    }

    const entityDeleted = this.mapToEntity(promotionData);

    return entityDeleted;
  }

  mapToEntity(entityData: Partial<Promotion>): Promotion {
    const brazilTimeZone = 'America/Campo_Grande';

    const dateMap = entityData.date
      ? DateTime.fromJSDate(entityData.date, { zone: 'utc' })
          .setZone(brazilTimeZone)
          .toISO({ includeOffset: true })
      : null;

    return new Promotion(
      entityData.id ?? null,
      entityData.whatIsThePromotion ?? null,
      entityData.title ?? null,
      entityData.description ?? null,
      dateMap,
      entityData.img ?? null,
      entityData.imgInnerFirst ?? null,
      entityData.altImgInnerFirst ?? null,
      entityData.imgInnerSecond ?? null,
      entityData.altImgInnerSecond ?? null,
      entityData.imgInnerThird ?? null,
      entityData.altImgInnerThird ?? null,
      entityData.createdAt ?? null,
      entityData.updatedAt ?? null,
    );
  }
}

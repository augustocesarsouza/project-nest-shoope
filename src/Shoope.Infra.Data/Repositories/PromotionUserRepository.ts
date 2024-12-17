import { PrismaService } from '../Context/Database/PrismaService';
import { Injectable } from '@nestjs/common';
import { IPromotionUserRepository } from 'src/Shoope.Domain/Repositories/IPromotionUserRepository';
import { PromotionUser } from 'src/Shoope.Domain/Entities/PromotionUser';
import { DateTime } from 'luxon';
import { Promotion } from 'src/Shoope.Domain/Entities/Promotion';
import { User } from 'src/Shoope.Domain/Entities/User';

@Injectable()
export class PromotionUserRepository extends IPromotionUserRepository {
  constructor(private _prisma: PrismaService) {
    super();
  }

  async GetById(userId: string): Promise<PromotionUser | null> {
    const entityData = await this._prisma.promotionUser.findFirst({
      where: {
        userId: userId,
        promotion: {
          NOT: null,
          whatIsThePromotion: 1,
        },
      },
      select: {
        id: true,
        promotionId: true,
        promotion: {
          select: {
            id: false,
            whatIsThePromotion: true,
            title: true,
            description: true,
            date: true,
            img: true,
            imgInnerFirst: false,
            altImgInnerFirst: false,
            imgInnerSecond: false,
            altImgInnerSecond: false,
            imgInnerThird: false,
            altImgInnerThird: false,
            createdAt: false,
            updatedAt: false,
          },
        },
        user: false,
        userId: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!entityData) {
      return null;
    }

    const promotionUser = new PromotionUser(
      entityData.id ?? null,
      entityData.promotionId,
      entityData.promotion ? this.mapToPromotion(entityData.promotion) : null,
      null,
      null,
      null,
      null,
    );

    return promotionUser;
  }

  async GetByUserIdAll(userId: string): Promise<PromotionUser[] | null> {
    const entityDataList = await this._prisma.promotionUser.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        promotionId: true,
        promotion: {
          select: {
            id: false,
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
        },
        user: false,
        userId: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!entityDataList) {
      return null;
    }

    const promotionUserList: PromotionUser[] = [];

    for (let i = 0; i < entityDataList.length; i++) {
      const element = entityDataList[i];
      const promotionUser = new PromotionUser(
        element.id ?? null,
        element.promotionId,
        element.promotion ? this.mapToPromotion(element.promotion) : null,
        null,
        null,
        null,
        null,
      );

      promotionUserList.push(promotionUser);
    }

    return promotionUserList;
  }

  async GetPromotionUserByPromotionId(promotionId: string): Promise<PromotionUser[] | null> {
    const entityDataList = await this._prisma.promotionUser.findMany({
      where: {
        promotionId: promotionId,
      },
      select: {
        id: true,
        promotionId: true,
        promotion: false,
        user: false,
        userId: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!entityDataList) {
      return null;
    }

    const promotionUserList: PromotionUser[] = [];

    for (let i = 0; i < entityDataList.length; i++) {
      const element = entityDataList[i];
      const promotionUser = new PromotionUser(
        element.id ?? null,
        element.promotionId,
        null,
        null,
        null,
        null,
        null,
      );

      promotionUserList.push(promotionUser);
    }

    return promotionUserList;
  }

  async CheckIfExistRegisterById(id: string): Promise<PromotionUser | null> {
    const entityData = await this._prisma.promotionUser.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        promotionId: true,
        promotion: {
          select: {
            id: false,
            whatIsThePromotion: true,
            title: true,
            description: true,
            date: true,
            img: true,
            imgInnerFirst: false,
            altImgInnerFirst: false,
            imgInnerSecond: false,
            altImgInnerSecond: false,
            imgInnerThird: false,
            altImgInnerThird: false,
            createdAt: false,
            updatedAt: false,
          },
        },
        user: false,
        userId: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!entityData) {
      return null;
    }

    const promotionUser = new PromotionUser(
      entityData.id ?? null,
      entityData.promotionId,
      entityData.promotion ? this.mapToPromotion(entityData.promotion) : null,
      null,
      null,
      null,
      null,
    );

    return promotionUser;
  }

  async Create(entity: PromotionUser): Promise<PromotionUser | null> {
    const promotionUserData = await this._prisma.promotionUser.create({
      data: {
        id: entity.id,
        promotionId: entity.promotionId,
        userId: entity.userId,
      },
    });

    if (!promotionUserData) {
      return null;
    }

    const entityCreated = this.mapToEntity(promotionUserData);

    return entityCreated;
  }

  async Update(entity: PromotionUser): Promise<PromotionUser | null> {
    const promotionUserData = await this._prisma.promotionUser.update({
      where: {
        id: entity.id,
      },
      data: {
        promotionId: entity.promotionId,
        userId: entity.userId,
      },
    });

    if (!promotionUserData) {
      return null;
    }

    const entityUpdated = this.mapToEntity(promotionUserData);

    return entityUpdated;
  }

  async Delete(id: string): Promise<PromotionUser | null> {
    const promotionUserData = await this._prisma.promotionUser.delete({
      where: { id: id },
    });

    if (!promotionUserData) {
      return null;
    }

    const entityDeleted = this.mapToEntity(promotionUserData);

    return entityDeleted;
  }

  mapToEntity(entityData: Partial<PromotionUser>): PromotionUser {
    return new PromotionUser(
      entityData.id ?? null,
      entityData.promotionId ?? null,
      entityData.promotion ? this.mapToPromotion(entityData.promotion) : null,
      entityData.userId ?? null,
      entityData.user ? this.mapToUser(entityData.user) : null,
      entityData.updatedAt ?? null,
      entityData.updatedAt ?? null,
    );
  }

  mapToPromotion(entityData: Partial<Promotion>): Promotion {
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

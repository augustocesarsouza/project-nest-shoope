import { PrismaService } from '../Context/Database/PrismaService';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { User } from 'src/Shoope.Domain/Entities/User';
import { IUserCuponRepository } from 'src/Shoope.Domain/Repositories/IUserCuponRepository';
import { Cupon } from 'src/Shoope.Domain/Entities/Cupon';
import { UserCupon } from 'src/Shoope.Domain/Entities/UserCupon';

@Injectable()
export class UserCuponRepository extends IUserCuponRepository {
  constructor(private _prisma: PrismaService) {
    super();
  }

  async GetAllCuponByUserId(userId: string): Promise<UserCupon[] | null> {
    const entityDataList = await this._prisma.userCupon.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: false,
        cupon: {
          select: {
            id: false,
            firstText: true,
            secondText: true,
            thirdText: true,
            dateValidateCupon: true,
            quantityCupons: true,
            whatCuponNumber: false,
            secondImg: false,
            secondImgAlt: false,
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

    const userCuponList: UserCupon[] = [];

    for (let i = 0; i < entityDataList.length; i++) {
      const element = entityDataList[i];
      const userCupon = new UserCupon(
        null,
        null,
        element.cupon ? this.mapToCupon(element.cupon) : null,
        null,
        null,
        null,
        null,
      );

      userCuponList.push(userCupon);
    }

    return userCuponList;
  }

  async CheckIfExistRegisterById(id: string): Promise<UserCupon | null> {
    const entityData = await this._prisma.userCupon.findFirst({
      where: {
        id: id,
      },
      select: {
        id: false,
        cupon: {
          select: {
            id: false,
            firstText: true,
            secondText: true,
            thirdText: true,
            dateValidateCupon: true,
            quantityCupons: true,
            whatCuponNumber: false,
            secondImg: false,
            secondImgAlt: false,
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

    const userCupon = new UserCupon(
      null,
      null,
      entityData.cupon ? this.mapToCupon(entityData.cupon) : null,
      null,
      null,
      null,
      null,
    );

    return userCupon;
  }

  async Create(entity: UserCupon): Promise<UserCupon | null> {
    const userCuponData = await this._prisma.userCupon.create({
      data: {
        id: entity.id,
        cuponId: entity.cuponId,
        userId: entity.userId,
      },
    });

    if (!userCuponData) {
      return null;
    }

    const entityCreated = this.mapToEntity(userCuponData);

    return entityCreated;
  }

  async Update(entity: UserCupon): Promise<UserCupon | null> {
    const userCuponData = await this._prisma.userCupon.update({
      where: {
        id: entity.id,
      },
      data: {
        cuponId: entity.cuponId,
        userId: entity.userId,
      },
    });

    if (!userCuponData) {
      return null;
    }

    const entityUpdated = this.mapToEntity(userCuponData);

    return entityUpdated;
  }

  async Delete(id: string): Promise<UserCupon | null> {
    const userCuponData = await this._prisma.userCupon.delete({
      where: { id: id },
    });

    if (!userCuponData) {
      return null;
    }

    const entityDeleted = this.mapToEntity(userCuponData);

    return entityDeleted;
  }

  mapToEntity(entityData: Partial<UserCupon>): UserCupon {
    return new UserCupon(
      entityData.id ?? null,
      entityData.cuponId ?? null,
      entityData.cupon ? this.mapToCupon(entityData.cupon) : null,
      entityData.userId ?? null,
      entityData.user ? this.mapToUser(entityData.user) : null,
      entityData.updatedAt ?? null,
      entityData.updatedAt ?? null,
    );
  }

  mapToCupon(entityData: Partial<Cupon>): Cupon {
    const brazilTimeZone = 'America/Campo_Grande';

    const dateValidateCupon = entityData.dateValidateCupon
      ? DateTime.fromJSDate(entityData.dateValidateCupon, { zone: 'utc' })
          .setZone(brazilTimeZone)
          .toISO({ includeOffset: true })
      : null;

    return new Cupon(
      entityData.id ?? null,
      entityData.firstText ?? null,
      entityData.secondText ?? null,
      entityData.thirdText ?? null,
      dateValidateCupon,
      entityData.quantityCupons ?? null,
      entityData.whatCuponNumber ?? null,
      entityData.secondImg ?? null,
      entityData.secondImgAlt ?? null,
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

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../Context/Database/PrismaService';
import { ICuponRepository } from 'src/Shoope.Domain/Repositories/ICuponRepository';
import { Cupon } from 'src/Shoope.Domain/Entities/Cupon';

@Injectable()
export class CuponRepository extends ICuponRepository {
  constructor(private _prisma: PrismaService) {
    super();
  }

  async GetCuponById(cuponId: string): Promise<Cupon | null> {
    const cuponData = await this._prisma.cupon.findFirst({
      where: {
        id: cuponId,
      },
      select: {
        id: true,
        firstText: true,
        secondText: true,
        thirdText: true,
        dateValidateCupon: true,
        quantityCupons: true,
        whatCuponNumber: true,
        secondImg: true,
        secondImgAlt: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!cuponData) {
      return null;
    }

    const cupon = this.mapToEntity(cuponData);

    return cupon;
  }

  async Create(entity: Cupon): Promise<Cupon | null> {
    const cuponData = await this._prisma.cupon.create({
      data: {
        id: entity.id,
        firstText: entity.firstText,
        secondText: entity.secondText,
        thirdText: entity.thirdText,
        dateValidateCupon: entity.dateValidateCupon,
        quantityCupons: entity.quantityCupons,
        whatCuponNumber: entity.whatCuponNumber,
        secondImg: entity.secondImg,
        secondImgAlt: entity.secondImgAlt,
      },
    });

    if (!cuponData) {
      return null;
    }

    const cupon = this.mapToEntity(cuponData);

    return cupon;
  }

  async Update(entity: Cupon): Promise<Cupon | null> {
    const cuponData = await this._prisma.cupon.create({
      data: {
        firstText: entity.firstText,
        secondText: entity.secondText,
        thirdText: entity.thirdText,
        dateValidateCupon: entity.dateValidateCupon,
        quantityCupons: entity.quantityCupons,
        whatCuponNumber: entity.whatCuponNumber,
        secondImg: entity.secondImg,
        secondImgAlt: entity.secondImgAlt,
      },
    });

    if (!cuponData) {
      return null;
    }

    const cupon = this.mapToEntity(cuponData);

    return cupon;
  }

  async Delete(id: string): Promise<Cupon | null> {
    const cuponData = await this._prisma.cupon.delete({
      where: { id: id },
    });

    if (!cuponData) {
      return null;
    }

    const cupon = this.mapToEntity(cuponData);

    return cupon;
  }

  mapToEntity(entityData: Partial<Cupon>): Cupon {
    return new Cupon(
      entityData.id ?? null,
      entityData.firstText ?? null,
      entityData.secondText ?? null,
      entityData.thirdText ?? null,
      entityData.dateValidateCupon ?? null,
      entityData.quantityCupons ?? null,
      entityData.whatCuponNumber ?? null,
      entityData.secondImg ?? null,
      entityData.secondImgAlt ?? null,
      entityData.createdAt ?? null,
      entityData.updatedAt ?? null,
    );
  }
}

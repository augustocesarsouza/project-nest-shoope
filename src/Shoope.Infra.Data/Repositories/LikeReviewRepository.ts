import { Injectable } from '@nestjs/common';
import { LikeReview } from 'src/Shoope.Domain/Entities/LikeReview';
import { ILikeReviewRepository } from 'src/Shoope.Domain/Repositories/ILikeReviewRepository';
import { PrismaService } from '../Context/Database/PrismaService';

@Injectable()
export class LikeReviewRepository extends ILikeReviewRepository {
  constructor(private _prisma: PrismaService) {
    super();
  }

  async GetByProductFlashSaleReviewsId(
    productFlashSaleReviewsId: string,
  ): Promise<LikeReview[] | null> {
    const likeReviewData = await this._prisma.likeReview.findMany({
      where: {
        productFlashSaleReviewsId: productFlashSaleReviewsId,
      },
      select: {
        id: true,
        productFlashSaleReviewsId: true,
        userId: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!likeReviewData) {
      return null;
    }

    const listLikeReview: LikeReview[] = [];

    for (let i = 0; i < likeReviewData.length; i++) {
      const likeReview = this.mapToLikeReview(likeReviewData[i]);
      listLikeReview.push(likeReview);
    }

    return listLikeReview;
  }

  async GetByUserId(userId: string): Promise<LikeReview | null> {
    const likeReviewData = await this._prisma.likeReview.findFirst({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        productFlashSaleReviewsId: true,
        userId: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!likeReviewData) {
      return null;
    }

    const likeReviewMap = this.mapToLikeReview(likeReviewData);

    return likeReviewMap;
  }

  async AlreadyExistLike(
    userId: string,
    productFlashSaleReviewsId: string,
  ): Promise<LikeReview | null> {
    const likeReviewData = await this._prisma.likeReview.findFirst({
      where: {
        userId: userId,
        productFlashSaleReviewsId: productFlashSaleReviewsId,
      },
      select: {
        id: true,
        productFlashSaleReviewsId: true,
        userId: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!likeReviewData) {
      return null;
    }

    const likeReviewMap = this.mapToLikeReview(likeReviewData);

    return likeReviewMap;
  }

  async Create(entity: LikeReview): Promise<LikeReview | null> {
    const entityData = await this._prisma.likeReview.create({
      data: {
        id: entity.id,
        productFlashSaleReviewsId: entity.productFlashSaleReviewsId,
        userId: entity.userId,
      },
    });

    if (!entityData) {
      return null;
    }

    const entityMap = this.mapToLikeReview(entityData);

    return entityMap;
  }

  async Update(entity: LikeReview): Promise<LikeReview | null> {
    const entityData = await this._prisma.likeReview.update({
      where: {
        id: entity.id,
      },
      data: {
        productFlashSaleReviewsId: entity.productFlashSaleReviewsId,
        userId: entity.userId,
      },
    });

    if (!entityData) {
      return null;
    }

    const entityMap = this.mapToLikeReview(entityData);

    return entityMap;
  }

  async Delete(id: string): Promise<LikeReview | null> {
    const entityData = await this._prisma.likeReview.delete({
      where: {
        id: id,
      },
    });

    if (!entityData) {
      return null;
    }

    const entityMap = this.mapToLikeReview(entityData);

    return entityMap;
  }

  mapToLikeReview(likeReviewData: Partial<LikeReview>): LikeReview {
    return new LikeReview(
      likeReviewData.id ?? null,
      likeReviewData.productFlashSaleReviewsId ?? null,
      likeReviewData.userId ?? null,
      likeReviewData.createdAt ?? null,
      likeReviewData.updatedAt ?? null,
    );
  }
}

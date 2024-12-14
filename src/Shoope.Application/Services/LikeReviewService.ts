import { Injectable } from '@nestjs/common';
import { ILikeReviewService } from './Interfaces/ILikeReviewService';
import { ILikeReviewRepository } from 'src/Shoope.Domain/Repositories/ILikeReviewRepository';
import { LikeReviewDTO } from '../DTOs/LikeReviewDTO';
import { ResultService } from './ResultService';
import { ILikeReviewMap } from '../Mappings/IMappings/ILikeReviewMap';
import { LikeReviewDTOValidateCreate } from '../DTOs/Validations/LikeReviewDTOValidate/LikeReviewDTOValidateCreate';
import { LikeReview } from 'src/Shoope.Domain/Entities/LikeReview';
import { v4 as uuidv4 } from 'uuid';
import { LikeReviewDTOValidateDelete } from '../DTOs/Validations/LikeReviewDTOValidate/LikeReviewDTOValidateDelete';

@Injectable()
export class LikeReviewService implements ILikeReviewService {
  constructor(
    private readonly _likeReviewRepository: ILikeReviewRepository,
    private readonly _likeReviewMap: ILikeReviewMap,
  ) {}

  async GetByProductFlashSaleReviewsId(
    productFlashSaleReviewsId: string,
  ): Promise<ResultService<LikeReviewDTO[] | null>> {
    try {
      const likeReviewList =
        await this._likeReviewRepository.GetByProductFlashSaleReviewsId(productFlashSaleReviewsId);

      if (!likeReviewList) {
        return ResultService.fail<LikeReviewDTO[] | null>('Address not found');
      }

      return ResultService.ok<LikeReviewDTO[]>(
        this._likeReviewMap.transformToDTOList(likeReviewList),
      );
    } catch (error) {
      return ResultService.fail<LikeReviewDTO[] | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Create(
    likeReviewDTOValidateCreate: LikeReviewDTOValidateCreate | null,
  ): Promise<ResultService<LikeReviewDTO | null>> {
    try {
      if (likeReviewDTOValidateCreate === null)
        return ResultService.fail<LikeReviewDTO | null>('DTO Is null');

      const likeAlreadyExist = await this._likeReviewRepository.AlreadyExistLike(
        likeReviewDTOValidateCreate.userId,
        likeReviewDTOValidateCreate.productFlashSaleReviewsId,
      );

      if (likeAlreadyExist != null) {
        const likeAlreadyExistDTO = new LikeReviewDTO(null, null, null, null, null, true);
        return ResultService.failWithData<LikeReviewDTO | null>(likeAlreadyExistDTO);
      }

      const id = uuidv4();

      const likeReviewCreate = await this._likeReviewRepository.Create(
        new LikeReview(
          id,
          likeReviewDTOValidateCreate.productFlashSaleReviewsId,
          likeReviewDTOValidateCreate.userId,
        ),
      );

      return ResultService.ok<LikeReviewDTO>(this._likeReviewMap.transformToDTO(likeReviewCreate));
    } catch (error) {
      return ResultService.fail<LikeReviewDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async Delete(
    likeReviewDTOValidateDelete: LikeReviewDTOValidateDelete | null,
  ): Promise<ResultService<LikeReviewDTO | null>> {
    try {
      if (likeReviewDTOValidateDelete === null)
        return ResultService.fail<LikeReviewDTO | null>('DTO Is null');

      const likeAlreadyExist = await this._likeReviewRepository.AlreadyExistLike(
        likeReviewDTOValidateDelete.userId,
        likeReviewDTOValidateDelete.productFlashSaleReviewsId,
      );

      if (likeAlreadyExist != null) {
        const likeAlreadyExistDTO = new LikeReviewDTO(null, null, null, null, null, true);
        return ResultService.failWithData<LikeReviewDTO | null>(likeAlreadyExistDTO);
      }

      const likeReviewDelete = await this._likeReviewRepository.Delete(likeAlreadyExist.id);

      return ResultService.ok<LikeReviewDTO>(this._likeReviewMap.transformToDTO(likeReviewDelete));
    } catch (error) {
      return ResultService.fail<LikeReviewDTO | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }
}

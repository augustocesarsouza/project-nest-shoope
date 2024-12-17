import { Injectable } from '@nestjs/common';
import { ICuponService } from './Interfaces/ICuponService';
import { CuponDTO } from '../DTOs/CuponDTO';
import { ResultService } from './ResultService';
import { ICuponMap } from '../Mappings/IMappings/ICuponMap';
import { ICuponRepository } from 'src/Shoope.Domain/Repositories/ICuponRepository';
import { v4 as uuidv4 } from 'uuid';
import { Cupon } from 'src/Shoope.Domain/Entities/Cupon';
import { CuponCreateDTOValidateCreate } from '../DTOs/Validations/CuponDTOValidate/CuponCreateDTOValidateCreate';

@Injectable()
export class CuponService implements ICuponService {
  constructor(
    private readonly _cuponRepository: ICuponRepository,
    private readonly _cuponMap: ICuponMap,
  ) {}

  async GetCuponById(cuponId: string): Promise<ResultService<CuponDTO | null>> {
    try {
      const cupon = await this._cuponRepository.GetCuponById(cuponId);

      if (!cupon) {
        return ResultService.fail<CuponDTO | null>('Address not found');
      }

      return ResultService.ok<CuponDTO>(this._cuponMap.transformToDTO(cupon));
    } catch (error) {
      return ResultService.fail<CuponDTO | null>(error.message || 'An unexpected error occurred');
    }
  }

  async Create(
    cuponCreateDTOValidateCreate: CuponCreateDTOValidateCreate | null,
  ): Promise<ResultService<CuponDTO | null>> {
    try {
      if (cuponCreateDTOValidateCreate === null) ResultService.fail<CuponDTO | null>('DTO is null');

      const id = uuidv4();

      const stringSlice = cuponCreateDTOValidateCreate.DateValidateCuponString.split('/');

      const day = parseInt(stringSlice[0], 10);
      const month = parseInt(stringSlice[1], 10);
      const year = parseInt(stringSlice[2], 10);

      const dateValidateCupon = new Date(year, month - 1, day);

      const cupon = new Cupon(
        id,
        cuponCreateDTOValidateCreate.firstText,
        cuponCreateDTOValidateCreate.secondText,
        cuponCreateDTOValidateCreate.thirdText,
        dateValidateCupon,
        cuponCreateDTOValidateCreate.quantityCupons,
        cuponCreateDTOValidateCreate.whatCuponNumber,
        cuponCreateDTOValidateCreate.secondImg,
        cuponCreateDTOValidateCreate.secondImgAlt,
      );

      const categoryCreate = await this._cuponRepository.Create(cupon);

      return ResultService.ok<CuponDTO>(this._cuponMap.transformToDTO(categoryCreate));
    } catch (error) {
      return ResultService.fail<CuponDTO | null>(error.message || 'An unexpected error occurred');
    }
  }

  async Delete(cuponId: string): Promise<ResultService<CuponDTO | null>> {
    try {
      const cuponForDelete = await this._cuponRepository.GetCuponById(cuponId);

      if (cuponForDelete === null) return ResultService.fail<CuponDTO | null>('Cupon not found');

      const categoryDeleteSuccessfully = await this._cuponRepository.Delete(cuponForDelete.id);

      return ResultService.ok<CuponDTO>(this._cuponMap.transformToDTO(categoryDeleteSuccessfully));
    } catch (error) {
      return ResultService.fail<CuponDTO | null>(error.message || 'An unexpected error occurred');
    }
  }
}

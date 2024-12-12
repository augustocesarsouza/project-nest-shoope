import { CuponDTO } from 'src/Shoope.Application/DTOs/CuponDTO';
import { ResultService } from '../ResultService';
import { CuponCreateDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/CuponDTOValidate/CuponCreateDTOValidateCreate';

export abstract class ICuponService {
  abstract GetCuponById(cuponId: string): Promise<ResultService<CuponDTO | null>>;
  abstract Create(
    cuponCreateDTOValidateCreate: CuponCreateDTOValidateCreate | null,
  ): Promise<ResultService<CuponDTO | null>>;
  abstract Delete(cuponId: string): Promise<ResultService<CuponDTO | null>>;
}

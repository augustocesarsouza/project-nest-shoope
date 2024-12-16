import { UserSellerProductDTO } from 'src/Shoope.Application/DTOs/UserSellerProductDTO';
import { ResultService } from '../ResultService';

export abstract class IUserSellerProductService {
  abstract GetById(
    userSellerProductId: string,
  ): Promise<ResultService<UserSellerProductDTO | null>>;
  abstract Create(
    userSellerProductDTO: UserSellerProductDTO | null,
  ): Promise<ResultService<UserSellerProductDTO | null>>;
  abstract Delete(id: string): Promise<ResultService<UserSellerProductDTO | null>>;
}

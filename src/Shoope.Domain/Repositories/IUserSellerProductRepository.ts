import { UserSellerProduct } from '../Entities/UserSellerProduct';

export abstract class IUserSellerProductRepository {
  abstract GetById(userSellerProductId: string): Promise<UserSellerProduct | null>;
  abstract CheckIfExistRegisterById(id: string): Promise<UserSellerProduct | null>;
  abstract Create(entity: UserSellerProduct): Promise<UserSellerProduct | null>;
  abstract Update(entity: UserSellerProduct): Promise<UserSellerProduct | null>;
  abstract Delete(id: string): Promise<UserSellerProduct | null>;
}

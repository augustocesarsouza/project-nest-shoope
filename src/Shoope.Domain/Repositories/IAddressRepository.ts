import { Address } from '../Entities/Address';

export abstract class IAddressRepository {
  abstract GetAddressById(addressId: string): Promise<Address | null>;
  abstract GetAddressByUserId(userId: string): Promise<Address[] | null>;
  abstract GetAddressByIdUser(userId: string): Promise<Address | null>;
  abstract VerifyIfUserAlreadyHaveAddress(userId: string): Promise<Address | null>;
  abstract GetAddressDefault(): Promise<Address | null>;
  abstract Create(entity: Address): Promise<Address | null>;
  abstract Update(entity: Address): Promise<Address | null>;
  abstract Delete(id: string): Promise<Address | null>;
}

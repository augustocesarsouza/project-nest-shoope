import { AddressDTO } from 'src/Shoope.Application/DTOs/AddressDTO';
import { ResultService } from '../ResultService';
import { AddressDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/AddressDTOValidate/AddressDTOValidateCreate';
import { AddressDTOValidatorUpdate } from 'src/Shoope.Application/DTOs/Validations/AddressDTOValidate/AddressDTOValidatorUpdate';
import { AddressDTOValidateUpdateOnlyDefault } from 'src/Shoope.Application/DTOs/Validations/AddressDTOValidate/AddressDTOValidateUpdateOnlyDefault';

export abstract class IAddressService {
  abstract GetAddressById(addressId: string): Promise<ResultService<AddressDTO | null>>;
  abstract GetAddressByUserId(userId: string): Promise<ResultService<AddressDTO[] | null>>;
  abstract GetAddressByUserIdUser(userId: string): Promise<ResultService<AddressDTO | null>>;
  abstract Create(
    addressDTOValidateCreate: AddressDTOValidateCreate | null,
  ): Promise<ResultService<AddressDTO | null>>;
  abstract UpdateAddressUser(
    addressDTOValidatorUpdate: AddressDTOValidatorUpdate | null,
  ): Promise<ResultService<AddressDTO | null>>;
  abstract UpdateAsyncOnlyDefaultAddress(
    addressDTOValidateUpdateOnlyDefault: AddressDTOValidateUpdateOnlyDefault | null,
  ): Promise<ResultService<AddressDTO | null>>;
  abstract Delete(addressId: string): Promise<ResultService<AddressDTO | null>>;
}

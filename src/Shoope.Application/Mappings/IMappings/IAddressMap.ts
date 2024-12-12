import { AddressDTO } from 'src/Shoope.Application/DTOs/AddressDTO';
import { Address } from 'src/Shoope.Domain/Entities/Address';

export abstract class IAddressMap {
  abstract transformToDTO(address: Address): AddressDTO;
  abstract transformToEntity(addressDTO: AddressDTO): Address;
  abstract transformToDTOList(Listaddress: Address[]): AddressDTO[];
  abstract transformToEntityList(addressDTO: AddressDTO[]): Address[];
}

import { Injectable } from '@nestjs/common';
import { IAddressMap } from './IMappings/IAddressMap';
import { AddressDTO } from '../DTOs/AddressDTO';
import { plainToClass } from 'class-transformer';
import { Address } from 'src/Shoope.Domain/Entities/Address';

@Injectable()
export class AddressMap implements IAddressMap {
  transformToDTO(address: Address): AddressDTO {
    return plainToClass(AddressDTO, address);
  }

  transformToEntity(addressDTO: AddressDTO): Address {
    return plainToClass(Address, addressDTO);
  }

  transformToDTOList(Listaddress: Address[]): AddressDTO[] {
    const addressAllDTO: AddressDTO[] = [];

    for (let i = 0; i < Listaddress.length; i++) {
      addressAllDTO.push(this.transformToDTO(Listaddress[i]));
    }

    return addressAllDTO;
  }
  transformToEntityList(addressDTO: AddressDTO[]): Address[] {
    const addressAll: Address[] = [];

    for (let i = 0; i < addressDTO.length; i++) {
      addressAll.push(this.transformToEntity(addressDTO[i]));
    }

    return addressAll;
  }
}

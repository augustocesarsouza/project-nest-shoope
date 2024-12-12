import { Injectable } from '@nestjs/common';
import { IAddressService } from './Interfaces/IAddressService';
import { AddressDTO } from '../DTOs/AddressDTO';
import { ResultService } from './ResultService';
import { IAddressRepository } from 'src/Shoope.Domain/Repositories/IAddressRepository';
import { IAddressMap } from '../Mappings/IMappings/IAddressMap';
import { AddressDTOValidateCreate } from '../DTOs/Validations/AddressDTOValidateCreate';
import { v4 as uuidv4 } from 'uuid';
import { Address } from 'src/Shoope.Domain/Entities/Address';
import { AddressDTOValidatorUpdate } from '../DTOs/Validations/AddressDTOValidatorUpdate';
import { AddressDTOValidateUpdateOnlyDefault } from '../DTOs/Validations/AddressDTOValidateUpdateOnlyDefault';

@Injectable()
export class AddressService implements IAddressService {
  constructor(
    private readonly _addressRepository: IAddressRepository,
    private readonly _addressMap: IAddressMap,
  ) {}

  async GetAddressById(addressId: string): Promise<ResultService<AddressDTO | null>> {
    try {
      const address = await this._addressRepository.GetAddressById(addressId);

      if (!address) {
        return ResultService.fail<AddressDTO | null>('Address not found');
      }

      return ResultService.ok<AddressDTO>(this._addressMap.transformToDTO(address));
    } catch (error) {
      return ResultService.fail<AddressDTO | null>(error.message || 'An unexpected error occurred');
    }
  }

  async GetAddressByUserId(userId: string): Promise<ResultService<AddressDTO[] | null>> {
    try {
      const addressAll = await this._addressRepository.GetAddressByUserId(userId);

      if (!addressAll) {
        return ResultService.fail<AddressDTO[] | null>('Address not found');
      }

      return ResultService.ok<AddressDTO[]>(this._addressMap.transformToDTOList(addressAll));
    } catch (error) {
      return ResultService.fail<AddressDTO[] | null>(
        error.message || 'An unexpected error occurred',
      );
    }
  }

  async GetAddressByUserIdUser(userId: string): Promise<ResultService<AddressDTO | null>> {
    try {
      const addressAll = await this._addressRepository.GetAddressByIdUser(userId);

      if (!addressAll) {
        return ResultService.fail<AddressDTO | null>('Address not found');
      }

      return ResultService.ok<AddressDTO>(this._addressMap.transformToDTO(addressAll));
    } catch (error) {
      return ResultService.fail<AddressDTO | null>(error.message || 'An unexpected error occurred');
    }
  }

  async Create(
    addressDTOValidateCreate: AddressDTOValidateCreate | null,
  ): Promise<ResultService<AddressDTO | null>> {
    try {
      if (addressDTOValidateCreate === null)
        ResultService.fail<AddressDTO | null>('addressDTOValidateCreate is null');

      const verifyIfExistAddressRegistered =
        await this._addressRepository.VerifyIfUserAlreadyHaveAddress(
          addressDTOValidateCreate.userId,
        );

      const idAddress = uuidv4();

      let defaultAddress = 0;

      if (verifyIfExistAddressRegistered === null) {
        defaultAddress = 1;
      }

      const address = new Address(
        idAddress,
        addressDTOValidateCreate.fullName,
        addressDTOValidateCreate.phoneNumber,
        addressDTOValidateCreate.cep,
        addressDTOValidateCreate.stateCity,
        addressDTOValidateCreate.neighborhood,
        addressDTOValidateCreate.street,
        addressDTOValidateCreate.numberHome,
        addressDTOValidateCreate.complement,
        defaultAddress,
        addressDTOValidateCreate.userId,
      );

      const addressCreate = await this._addressRepository.Create(address);

      return ResultService.ok<AddressDTO>(this._addressMap.transformToDTO(addressCreate));
    } catch (error) {
      return ResultService.fail<AddressDTO | null>(error.message || 'An unexpected error occurred');
    }
  }

  async UpdateAddressUser(
    addressDTOValidatorUpdate: AddressDTOValidatorUpdate | null,
  ): Promise<ResultService<AddressDTO | null>> {
    try {
      if (!addressDTOValidatorUpdate)
        return ResultService.fail<AddressDTO | null>('error DTO Informed is null');

      const addressDb = await this._addressRepository.GetAddressById(addressDTOValidatorUpdate.id);

      if (!addressDb) return ResultService.fail<AddressDTO | null>('Address not found');

      addressDb.SetValueToUpdateAddress(
        addressDTOValidatorUpdate.fullName,
        addressDTOValidatorUpdate.phoneNumber,
        addressDTOValidatorUpdate.cep,
        addressDTOValidatorUpdate.stateCity,
        addressDTOValidatorUpdate.neighborhood,
        addressDTOValidatorUpdate.street,
        addressDTOValidatorUpdate.numberHome,
        addressDTOValidatorUpdate.complement,
      );

      const addressUpdate = await this._addressRepository.Update(addressDb);

      return ResultService.ok(this._addressMap.transformToDTO(addressUpdate));
    } catch (error) {
      return ResultService.fail<AddressDTO | null>(error.message || 'An unexpected error occurred');
    }
  }

  async UpdateAsyncOnlyDefaultAddress(
    addressDTOValidateUpdateOnlyDefault: AddressDTOValidateUpdateOnlyDefault | null,
  ): Promise<ResultService<AddressDTO | null>> {
    try {
      if (!addressDTOValidateUpdateOnlyDefault)
        return ResultService.fail<AddressDTO | null>('error DTO Informed is null');

      const addressDb = await this._addressRepository.GetAddressById(
        addressDTOValidateUpdateOnlyDefault.id,
      );

      if (!addressDb) return ResultService.fail<AddressDTO | null>('Address not found');

      addressDb.SetDefaultAddress(addressDTOValidateUpdateOnlyDefault.defaultAddress);

      const addressUpdate = await this._addressRepository.Update(addressDb);

      return ResultService.ok(this._addressMap.transformToDTO(addressUpdate));
    } catch (error) {
      return ResultService.fail<AddressDTO | null>(error.message || 'An unexpected error occurred');
    }
  }

  Delete(addressId: string): Promise<ResultService<AddressDTO | null>> {
    throw new Error('Method not implemented.' + addressId);
  }
}

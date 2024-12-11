import { Injectable } from '@nestjs/common';
import { IAddressRepository } from 'src/Shoope.Domain/Repositories/IAddressRepository';
import { PrismaService } from '../Context/Database/PrismaService';
import { Address } from 'src/Shoope.Domain/Entities/Address';

@Injectable()
export class AddressRepository extends IAddressRepository {
  constructor(private _prisma: PrismaService) {
    super();
  }

  GetAddressById(addressId: string): Promise<Address | null> {
    throw new Error('Method not implemented.' + addressId);
  }
  GetAddressByUserId(userId: string): Promise<Address[] | null> {
    throw new Error('Method not implemented.' + userId);
  }
  VerifyIfUserAlreadyHaveAddress(userId: string): Promise<Address | null> {
    throw new Error('Method not implemented.' + userId);
  }
  GetAddressDefault(): Promise<Address | null> {
    throw new Error('Method not implemented.');
  }
  async Create(entity: Address): Promise<Address | null> {
    const addressData = await this._prisma.address.create({
      data: {
        id: entity.id,
        fullName: entity.fullName,
        phoneNumber: entity.phoneNumber,
        cep: entity.cep,
        stateCity: entity.stateCity,
        neighborhood: entity.neighborhood,
        street: entity.street,
        numberHome: entity.numberHome,
        complement: entity.complement,
        defaultAddress: entity.defaultAddress,
        userId: entity.userId,
      },
    });

    if (!addressData) {
      return null;
    }

    // Cria uma instância de User a partir dos dados obtidos
    const address = new Address({
      id: entity.id,
      fullName: entity.fullName,
      phoneNumber: entity.phoneNumber,
      cep: entity.cep,
      stateCity: entity.stateCity,
      neighborhood: entity.neighborhood,
      street: entity.street,
      numberHome: entity.numberHome,
      complement: entity.complement,
      defaultAddress: entity.defaultAddress,
      userId: entity.userId,
      createdAt: addressData.createdAt,
      updatedAt: addressData.updatedAt,
    });

    return address;
  }
  Update(entity: Address): Promise<Address | null> {
    throw new Error('Method not implemented.' + entity);
  }
  Delete(id: string): Promise<Address | null> {
    throw new Error('Method not implemented.' + id);
  }
}

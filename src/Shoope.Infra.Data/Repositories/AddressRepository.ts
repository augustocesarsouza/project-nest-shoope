import { Injectable } from '@nestjs/common';
import { IAddressRepository } from 'src/Shoope.Domain/Repositories/IAddressRepository';
import { PrismaService } from '../Context/Database/PrismaService';
import { Address } from 'src/Shoope.Domain/Entities/Address';
import { User } from 'src/Shoope.Domain/Entities/User';

@Injectable()
export class AddressRepository extends IAddressRepository {
  constructor(private _prisma: PrismaService) {
    super();
  }

  async GetAddressById(addressId: string): Promise<Address | null> {
    const addressData = await this._prisma.address.findFirst({
      where: {
        id: addressId,
      },
      select: {
        id: true,
        fullName: true,
        phoneNumber: true,
        cep: true,
        stateCity: true,
        neighborhood: true,
        street: true,
        numberHome: true,
        complement: true,
        defaultAddress: true,
        userId: true,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!addressData) {
      return null;
    }

    const address = this.mapToAddress(addressData);

    return address;
  }

  async GetAddressByUserId(userId: string): Promise<Address[] | null> {
    const addressData = await this._prisma.address.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        fullName: true,
        phoneNumber: true,
        cep: true,
        stateCity: true,
        neighborhood: true,
        street: true,
        numberHome: true,
        complement: true,
        defaultAddress: true,
        userId: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!addressData) {
      return null; // Retorna null se o usuário não for encontrado
    }

    const listAddress: Address[] = [];

    for (let i = 0; i < addressData.length; i++) {
      const address = this.mapToAddress(addressData[i]);
      listAddress.push(address);
    }

    return listAddress;
  }

  async GetAddressByIdUser(userId: string): Promise<Address | null> {
    const addressData = await this._prisma.address.findFirst({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        fullName: true,
        phoneNumber: true,
        cep: true,
        stateCity: true,
        neighborhood: true,
        street: true,
        numberHome: true,
        complement: true,
        defaultAddress: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!addressData) {
      return null;
    }

    const address = new Address(
      addressData.id ?? null,
      addressData.fullName ?? null,
      addressData.phoneNumber ?? null,
      addressData.cep ?? null,
      addressData.stateCity ?? null,
      addressData.neighborhood ?? null,
      addressData.street ?? null,
      addressData.numberHome ?? null,
      addressData.complement ?? null,
      addressData.defaultAddress ?? null,
      addressData.userId ?? null,
      addressData.user ? this.mapToUser(addressData.user) : null,
      null,
      null,
    );

    return address;
  }

  async VerifyIfUserAlreadyHaveAddress(userId: string): Promise<Address | null> {
    const addressData = await this._prisma.address.findFirst({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        fullName: true,
        phoneNumber: false,
        cep: false,
        stateCity: false,
        neighborhood: false,
        street: false,
        numberHome: false,
        complement: false,
        defaultAddress: false,
        userId: false,
        createdAt: false,
        updatedAt: false,
      },
    });

    if (!addressData) {
      return null;
    }

    const address = this.mapToAddress(addressData);

    return address;
  }

  async GetAddressDefault(): Promise<Address | null> {
    const addressData = await this._prisma.address.findFirst({
      where: {
        defaultAddress: 1,
      },
      select: {
        id: true,
        fullName: true,
        phoneNumber: true,
        cep: true,
        stateCity: true,
        neighborhood: true,
        street: true,
        numberHome: true,
        complement: true,
        defaultAddress: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!addressData) {
      return null; // Retorna null se o usuário não for encontrado
    }

    const address = this.mapToAddress(addressData);

    return address;
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

    const address = this.mapToAddress(addressData);

    return address;
  }

  async Update(entity: Address): Promise<Address | null> {
    const addressData = await this._prisma.address.update({
      where: {
        id: entity.id,
      },
      data: {
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

    const address = this.mapToAddress(addressData);

    return address;
  }

  async Delete(id: string): Promise<Address | null> {
    const addressData = await this._prisma.address.delete({
      where: {
        id: id, // Supondo que `id` é a chave primária.
      },
    });

    if (!addressData) {
      return null; // Retorna null se o usuário não for encontrado
    }

    const address = this.mapToAddress(addressData);

    return address;
  }

  mapToAddress(addressData: Partial<Address>): Address {
    return new Address(
      addressData.id ?? null,
      addressData.fullName ?? null,
      addressData.phoneNumber ?? null,
      addressData.cep ?? null,
      addressData.stateCity ?? null,
      addressData.neighborhood ?? null,
      addressData.street ?? null,
      addressData.numberHome ?? null,
      addressData.complement ?? null,
      addressData.defaultAddress ?? null,
      addressData.userId ?? null,
      addressData.user ?? null,
      addressData.createdAt ?? null,
      addressData.updatedAt ?? null,
    );
  }

  mapToUser(userData: Partial<User>): User {
    return new User(
      userData.id ?? null,
      userData.name ?? null,
      userData.email ?? null,
      userData.gender ?? null,
      userData.phone ?? null,
      userData.passwordHash ?? null,
      userData.salt ?? null,
      userData.cpf ?? null,
      userData.birthDate ?? null,
      userData.userImage ?? null,
    );
  }
}

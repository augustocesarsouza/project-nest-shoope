import { IUserRepository } from 'src/Shoope.Domain/Repositories/IUserRepository';
import { PrismaService } from '../Context/Database/PrismaService';
import { User } from 'src/Shoope.Domain/Entities/User';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends IUserRepository {
  constructor(private _prisma: PrismaService) {
    super();
  }

  async GetUserById(id: string): Promise<User | null> {
    const user = await this._prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        gender: true,
        phone: true,
        passwordHash: true,
        salt: true,
        cpf: true,
        birthDate: true,
        userImage: true,
      },
    });

    return user;
  }

  async GetUserByIdForDeleteImg(id: string): Promise<User | null> {
    const user = await this._prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: false,
        email: false,
        gender: false,
        phone: false,
        passwordHash: false,
        salt: false,
        cpf: false,
        birthDate: false,
        userImage: true,
      },
    });

    return user;
  }

  async GetUserByPhoneInfoUpdate(phone: string): Promise<User | null> {
    const user = await this._prisma.user.findFirst({
      where: {
        phone: phone,
      },
      select: {
        id: true,
        name: true,
        email: true,
        gender: true,
        phone: true,
        passwordHash: true,
        salt: true,
        cpf: true,
        birthDate: true,
        userImage: true,
      },
    });

    return user;
  }
  async GetUserByIdInfoUser(id: string): Promise<User | null> {
    const user = await this._prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        gender: true,
        phone: true,
        passwordHash: false,
        salt: false,
        cpf: true,
        birthDate: true,
        userImage: true,
      },
    });

    return user;
  }
  async GetUserByPhone(phone: string): Promise<User | null> {
    const user = await this._prisma.user.findFirst({
      where: {
        phone: phone,
      },
      select: {
        id: true,
        name: true,
        email: false,
        gender: false,
        phone: false,
        passwordHash: false,
        salt: false,
        cpf: false,
        birthDate: false,
        userImage: true,
      },
    });

    return user;
  }

  async GetUserByName(name: string): Promise<User | null> {
    const user = await this._prisma.user.findFirst({
      where: {
        name: name,
      },
      select: {
        id: true,
        name: true,
        email: false,
        gender: false,
        phone: false,
        passwordHash: false,
        salt: false,
        cpf: false,
        birthDate: false,
        userImage: true,
      },
    });

    return user;
  }
  async GetIfUserExistEmail(email: string): Promise<User | null> {
    const user = await this._prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        email: false,
        gender: false,
        phone: false,
        passwordHash: false,
        salt: false,
        cpf: false,
        birthDate: false,
        userImage: true,
      },
    });

    return user;
  }
  async GetUserInfoToLogin(phone: string): Promise<User | null> {
    const user = await this._prisma.user.findFirst({
      where: {
        phone: phone,
      },
      select: {
        id: true,
        name: true,
        email: true,
        gender: false,
        phone: true,
        passwordHash: true,
        salt: true,
        cpf: false,
        birthDate: false,
        userImage: true,
      },
    });

    return user;
  }

  async Create(entity: User): Promise<User | null> {
    const user = await this._prisma.user.create({
      data: {
        id: entity.id,
        name: entity.name,
        email: entity.email,
        gender: entity.gender,
        phone: entity.phone,
        passwordHash: entity.passwordHash,
        salt: entity.salt,
        cpf: entity.cpf,
        birthDate: entity.birthDate,
        userImage: entity.userImage,
      },
    });

    return user;
  }

  async Update(entity: User): Promise<User | null> {
    const user = await this._prisma.user.update({
      where: {
        id: entity.id,
      },
      data: {
        name: entity.name,
        email: entity.email,
        gender: entity.gender,
        phone: entity.phone,
        passwordHash: entity.passwordHash,
        salt: entity.salt,
        cpf: entity.cpf,
        birthDate: entity.birthDate,
        userImage: entity.userImage,
      },
    });
    return user;
  }
  async Delete(id: string): Promise<User | null> {
    const user = await this._prisma.user.delete({
      where: {
        id: id, // Supondo que `id` é a chave primária.
      },
    });
    return user;
  }
}

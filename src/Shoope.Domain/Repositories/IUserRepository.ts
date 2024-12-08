import { User } from '../Entities/User';

export abstract class IUserRepository {
  abstract GetUserById(id: string): Promise<User | null>;
  abstract GetUserByPhoneInfoUpdate(phone: string): Promise<User | null>;
  abstract GetUserByIdInfoUser(id: string): Promise<User | null>;
  abstract GetUserByPhone(phone: string): Promise<User | null>;
  abstract GetUserByName(name: string): Promise<User | null>;
  abstract GetIfUserExistEmail(email: string): Promise<User | null>;
  abstract GetUserInfoToLogin(phone: string): Promise<User | null>;
  abstract Create(entity: User): Promise<User | null>;
  abstract Update(entity: User): Promise<User | null>;
  abstract Delete(id: string): Promise<User | null>;
}

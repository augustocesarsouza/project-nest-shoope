import { UserDTO } from './UserDTO';

export class AddressDTO {
  id: string;
  fullName?: string;
  phoneNumber?: string;
  cep?: string;
  stateCity?: string;
  neighborhood?: string;
  street?: string;
  numberHome?: string;
  complement?: string;
  defaultAddress?: number;

  userId?: string;
  user?: UserDTO;

  createdAt?: Date; // Data de criação
  updatedAt?: Date; // Data de atualização

  constructor(init?: Partial<AddressDTO>) {
    Object.assign(this, init);
  }
}

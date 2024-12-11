import { User } from './User';

export class Address {
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
  user?: User;

  createdAt: Date; // Data de criação
  updatedAt: Date; // Data de atualização

  constructor(init?: Partial<Address>) {
    Object.assign(this, init);
  }
}

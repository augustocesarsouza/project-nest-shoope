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

  createdAt?: Date; // Data de criação
  updatedAt?: Date; // Data de atualização

  // constructor(init?: Partial<Address>) {
  //   Object.assign(this, init);
  // }
  constructor(
    id?: string,
    fullName?: string,
    phoneNumber?: string,
    cep?: string,
    stateCity?: string,
    neighborhood?: string,
    street?: string,
    numberHome?: string,
    complement?: string,
    defaultAddress?: number,
    userId?: string,
    user?: User,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.cep = cep;
    this.stateCity = stateCity;
    this.neighborhood = neighborhood;
    this.street = street;
    this.numberHome = numberHome;
    this.complement = complement;
    this.defaultAddress = defaultAddress;
    this.userId = userId;
    this.user = user;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public SetValueToUpdateAddress(
    fullName: string,
    phoneNumber: string,
    cep?: string,
    stateCity?: string,
    neighborhood?: string,
    street?: string,
    numberHome?: string,
    complement?: string,
  ) {
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.cep = cep;
    this.stateCity = stateCity;
    this.neighborhood = neighborhood;
    this.street = street;
    this.numberHome = numberHome;
    this.complement = complement;
  }

  public SetDefaultAddress(defaultAddress: number) {
    this.defaultAddress = defaultAddress;
  }
}

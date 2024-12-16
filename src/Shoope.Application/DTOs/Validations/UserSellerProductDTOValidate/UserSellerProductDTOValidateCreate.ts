import { IsNotEmpty } from 'class-validator';

export class UserSellerProductDTOValidateCreate {
  id: string;
  @IsNotEmpty()
  name?: string;
  @IsNotEmpty()
  imgPerfilBase64?: string;
  imgFloatingBase64?: string;
  imgFloating?: string;
  lastLogin?: Date;
  reviews?: number;
  chatResponseRate?: number;
  accountCreationDate?: Date;
  quantityOfProductSold?: number;
  usuallyRespondsToChatIn?: string;
  followers?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

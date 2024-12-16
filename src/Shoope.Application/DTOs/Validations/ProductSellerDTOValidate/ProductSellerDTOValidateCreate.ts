import { IsNotEmpty } from 'class-validator';
import { UserSellerProductDTO } from '../../UserSellerProductDTO';

export class ProductSellerDTOValidateCreate {
  id: string;
  @IsNotEmpty()
  userSellerProductId?: string;
  userSellerProductDTO?: UserSellerProductDTO;
  @IsNotEmpty()
  productId?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

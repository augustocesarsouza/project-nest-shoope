import { UserSellerProductDTO } from './UserSellerProductDTO';

export class ProductSellerDTO {
  id: string;
  userSellerProductId?: string;
  userSellerProductDTO?: UserSellerProductDTO;
  productId?: string;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    userSellerProductId?: string,
    userSellerProductDTO?: UserSellerProductDTO,
    productId?: string,

    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.userSellerProductId = userSellerProductId;
    this.userSellerProductDTO = userSellerProductDTO;
    this.productId = productId;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

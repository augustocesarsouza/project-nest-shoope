import { UserSellerProduct } from './UserSellerProduct';

export class ProductSeller {
  id: string;
  userSellerProductId?: string;
  userSellerProduct?: UserSellerProduct;
  productId?: string;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    userSellerProductId?: string,
    userSellerProduct?: UserSellerProduct,
    productId?: string,

    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.userSellerProductId = userSellerProductId;
    this.userSellerProduct = userSellerProduct;
    this.productId = productId;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

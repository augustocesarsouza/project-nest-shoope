export class ProductDescription {
  id: string;
  description?: string;
  characteristics?: string[];
  productId?: string;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id?: string,
    description?: string,
    characteristics?: string[],
    productId?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.description = description;
    this.characteristics = characteristics;
    this.productId = productId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

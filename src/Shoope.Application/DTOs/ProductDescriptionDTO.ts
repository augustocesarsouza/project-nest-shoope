export class ProductDescriptionDTO {
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
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.description = description;
    this.characteristics = characteristics;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

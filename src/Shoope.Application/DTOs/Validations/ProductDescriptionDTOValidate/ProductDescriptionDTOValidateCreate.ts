import { IsNotEmpty } from 'class-validator';

export class ProductDescriptionDTOValidateCreate {
  id: string;
  @IsNotEmpty()
  description?: string;
  @IsNotEmpty()
  characteristics?: string[];
  @IsNotEmpty()
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

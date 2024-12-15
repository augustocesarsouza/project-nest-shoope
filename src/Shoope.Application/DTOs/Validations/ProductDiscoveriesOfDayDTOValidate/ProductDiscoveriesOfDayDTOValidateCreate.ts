import { IsNotEmpty, Min } from 'class-validator';

export class ProductDiscoveriesOfDayDTOValidateCreate {
  id: string;
  @IsNotEmpty()
  title?: string;
  @IsNotEmpty()
  imgProduct?: string;
  imgPartBottom?: string;
  discountPercentage?: number;
  @IsNotEmpty()
  isAd?: boolean;
  @IsNotEmpty()
  @Min(0, { message: 'price must be greather than 0' })
  price?: number;
  quantitySold?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

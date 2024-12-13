import { IsNotEmpty, Min } from 'class-validator';

export class ProductsOfferFlashDTOValidateCreate {
  id: string;
  @IsNotEmpty()
  imgProduct?: string;
  @IsNotEmpty()
  altValue?: string;
  imgPartBottom?: string;
  @IsNotEmpty()
  @Min(0, { message: 'priceProduct must be greater than or equal to 0' })
  priceProduct?: number;
  @IsNotEmpty()
  @Min(0, { message: 'popularityPercentage must be greater than or equal to 0' })
  popularityPercentage?: number;
  discountPercentage?: number;
  @IsNotEmpty()
  hourFlashOffer?: string;
  title?: string;
  @IsNotEmpty()
  tagProduct?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

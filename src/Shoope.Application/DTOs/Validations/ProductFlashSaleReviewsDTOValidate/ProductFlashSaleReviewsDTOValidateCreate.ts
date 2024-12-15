import { IsNotEmpty, Max, Min } from 'class-validator';
import { UserDTO } from '../../UserDTO';

export class ProductFlashSaleReviewsDTOValidateCreate {
  id: string;
  @IsNotEmpty()
  message?: string;
  creationDate?: Date;
  @IsNotEmpty()
  costBenefit?: string;
  @IsNotEmpty()
  similarToAd?: string;
  @IsNotEmpty()
  @Min(0, { message: 'starQuantity must be at least 0' })
  @Max(5, { message: 'starQuantity must be greater than 5' })
  starQuantity?: number;
  @IsNotEmpty()
  productsOfferFlashId?: string;
  userId?: string;
  userDTO?: UserDTO;
  imgAndVideoReviewsProductElements: string[];
  imgAndVideoReviewsProduct?: string[];
  variation?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

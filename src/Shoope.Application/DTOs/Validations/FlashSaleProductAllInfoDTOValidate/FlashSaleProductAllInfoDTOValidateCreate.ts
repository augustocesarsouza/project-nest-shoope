import { IsNotEmpty } from 'class-validator';
import { ProductsOfferFlashDTO } from '../../ProductsOfferFlashDTO';

export class FlashSaleProductAllInfoDTOValidateCreate {
  id: string;

  @IsNotEmpty()
  productsOfferFlashId?: string;
  productsOfferFlashDTO?: ProductsOfferFlashDTO;

  @IsNotEmpty()
  productReviewsRate?: number;
  @IsNotEmpty()
  quantitySold?: number;
  @IsNotEmpty()
  favoriteQuantity?: number;
  @IsNotEmpty()
  quantityAvaliation?: number;

  coins?: number;
  creditCard?: number;
  voltage?: string;
  quantityPiece?: number;
  size?: string;
  productHaveInsurance?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

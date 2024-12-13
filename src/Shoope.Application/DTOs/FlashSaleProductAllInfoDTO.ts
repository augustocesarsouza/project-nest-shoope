import { ProductsOfferFlashDTO } from './ProductsOfferFlashDTO';

export class FlashSaleProductAllInfoDTO {
  id: string;

  productsOfferFlashId?: string;
  productsOfferFlashDTO?: ProductsOfferFlashDTO;

  productReviewsRate?: number;
  quantitySold?: number;
  favoriteQuantity?: number;
  quantityAvaliation?: number;

  coins?: number;
  creditCard?: number;
  voltage?: string;
  quantityPiece?: number;
  size?: string;
  productHaveInsurance?: boolean;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    productsOfferFlashId: string,
    productsOfferFlashDTO?: ProductsOfferFlashDTO,
    productReviewsRate?: number,
    quantitySold?: number,
    favoriteQuantity?: number,
    quantityAvaliation?: number,
    coins?: number,
    creditCard?: number,
    voltage?: string,
    quantityPiece?: number,
    size?: string,
    productHaveInsurance?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.productsOfferFlashId = productsOfferFlashId;
    this.productsOfferFlashDTO = productsOfferFlashDTO;
    this.productReviewsRate = productReviewsRate;
    this.quantitySold = quantitySold;
    this.favoriteQuantity = favoriteQuantity;
    this.quantityAvaliation = quantityAvaliation;
    this.coins = coins;
    this.creditCard = creditCard;
    this.voltage = voltage;
    this.quantityPiece = quantityPiece;
    this.size = size;
    this.productHaveInsurance = productHaveInsurance;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

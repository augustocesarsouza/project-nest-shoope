import { UserDTO } from './UserDTO';

export class ProductFlashSaleReviewsDTO {
  id: string;
  message?: string;
  creationDate?: Date;
  costBenefit?: string;
  similarToAd?: string;
  starQuantity?: number;
  productsOfferFlashId?: string;
  userId?: string;
  userDTO?: UserDTO;
  imgAndVideoReviewsProduct?: string[];
  variation?: string;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    message?: string,
    creationDate?: Date,
    costBenefit?: string,
    similarToAd?: string,
    starQuantity?: number,
    productsOfferFlashId?: string,
    userId?: string,
    userDTO?: UserDTO,
    imgAndVideoReviewsProduct?: string[],
    variation?: string,

    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.message = message;
    this.creationDate = creationDate;
    this.costBenefit = costBenefit;
    this.similarToAd = similarToAd;
    this.starQuantity = starQuantity;
    this.productsOfferFlashId = productsOfferFlashId;
    this.userId = userId;
    this.userDTO = userDTO;
    this.imgAndVideoReviewsProduct = imgAndVideoReviewsProduct;
    this.variation = variation;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

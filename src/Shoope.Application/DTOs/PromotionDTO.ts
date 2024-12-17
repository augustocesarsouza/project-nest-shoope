export class PromotionDTO {
  id: string;
  imgProduct?: string;
  altValue?: string;
  imgPartBottom?: string;
  priceProduct?: number;
  popularityPercentage?: number;
  discountPercentage?: number;
  hourFlashOffer?: string;
  title?: string;
  tagProduct?: string;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    imgProduct?: string,
    altValue?: string,
    imgPartBottom?: string,
    priceProduct?: number,
    popularityPercentage?: number,
    discountPercentage?: number,
    hourFlashOffer?: string,
    title?: string,
    tagProduct?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.imgProduct = imgProduct;
    this.altValue = altValue;
    this.imgPartBottom = imgPartBottom;
    this.priceProduct = priceProduct;
    this.popularityPercentage = popularityPercentage;
    this.discountPercentage = discountPercentage;
    this.hourFlashOffer = hourFlashOffer;
    this.title = title;
    this.tagProduct = tagProduct;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

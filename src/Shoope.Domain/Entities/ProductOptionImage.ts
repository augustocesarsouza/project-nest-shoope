export class ProductOptionImage {
  id: string;
  optionType?: string;
  imgAlt?: string;
  imageUrl?: string;
  titleOptionType?: string;
  productsOfferFlashId?: string;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    optionType?: string,
    imgAlt?: string,
    imageUrl?: string,
    titleOptionType?: string,
    productsOfferFlashId?: string,

    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.optionType = optionType;
    this.imgAlt = imgAlt;
    this.imageUrl = imageUrl;
    this.titleOptionType = titleOptionType;
    this.productsOfferFlashId = productsOfferFlashId;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class ProductDiscoveriesOfDay {
  id: string;
  title?: string;
  imgProduct?: string;
  imgPartBottom?: string;
  discountPercentage?: number;
  isAd?: boolean;
  price?: number;
  quantitySold?: number;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    title?: string,
    imgProduct?: string,
    imgPartBottom?: string,
    discountPercentage?: number,
    isAd?: boolean,
    price?: number,
    quantitySold?: number,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.title = title;
    this.imgProduct = imgProduct;
    this.imgPartBottom = imgPartBottom;
    this.discountPercentage = discountPercentage;
    this.isAd = isAd;
    this.price = price;
    this.quantitySold = quantitySold;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

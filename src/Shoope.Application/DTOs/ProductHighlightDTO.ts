export class ProductHighlightDTO {
  id: string;
  title?: string;
  imgProduct?: string;

  imgTop?: string;
  quantitySold?: number;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    title?: string,
    imgProduct?: string,
    imgTop?: string,
    quantitySold?: number,

    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.title = title;
    this.imgProduct = imgProduct;
    this.imgTop = imgTop;
    this.quantitySold = quantitySold;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

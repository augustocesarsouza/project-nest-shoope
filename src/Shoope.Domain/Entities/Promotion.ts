export class Promotion {
  id: string;
  whatIsThePromotion?: number;
  title?: string;
  description?: string;
  date?: Date;
  img?: string;
  imgInnerFirst?: string;
  altImgInnerFirst?: string;
  imgInnerSecond?: string;
  altImgInnerSecond?: string;
  imgInnerThird?: string;
  altImgInnerThird?: string;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    whatIsThePromotion?: number,
    title?: string,
    description?: string,
    date?: Date,
    img?: string,
    imgInnerFirst?: string,
    altImgInnerFirst?: string,
    imgInnerSecond?: string,
    altImgInnerSecond?: string,
    imgInnerThird?: string,
    altImgInnerThird?: string,

    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.whatIsThePromotion = whatIsThePromotion;
    this.title = title;
    this.description = description;
    this.date = date;
    this.img = img;
    this.imgInnerFirst = imgInnerFirst;
    this.altImgInnerFirst = altImgInnerFirst;
    this.imgInnerSecond = imgInnerSecond;
    this.altImgInnerSecond = altImgInnerSecond;
    this.imgInnerThird = imgInnerThird;
    this.altImgInnerThird = altImgInnerThird;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

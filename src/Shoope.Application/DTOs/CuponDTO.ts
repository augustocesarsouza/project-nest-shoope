export class CuponDTO {
  id: string;
  firstText?: string;
  secondText?: string;
  thirdText?: string;
  dateValidateCupon?: Date;
  quantityCupons?: number;
  whatCuponNumber?: number;
  secondImg?: string;
  secondImgAlt?: string;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    firstText?: string,
    secondText?: string,
    thirdText?: string,
    dateValidateCupon?: Date,
    quantityCupons?: number,
    whatCuponNumber?: number,
    secondImg?: string,
    secondImgAlt?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.firstText = firstText;
    this.secondText = secondText;
    this.thirdText = thirdText;
    this.dateValidateCupon = dateValidateCupon;
    this.quantityCupons = quantityCupons;
    this.whatCuponNumber = whatCuponNumber;
    this.secondImg = secondImg;
    this.secondImgAlt = secondImgAlt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

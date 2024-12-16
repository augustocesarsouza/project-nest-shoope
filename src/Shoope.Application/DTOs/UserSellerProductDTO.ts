export class UserSellerProductDTO {
  id: string;
  name?: string;
  imgPerfil?: string;
  imgFloating?: string;
  lastLogin?: Date;
  reviews?: number;
  chatResponseRate?: number;
  accountCreationDate?: Date;
  quantityOfProductSold?: number;
  usuallyRespondsToChatIn?: string;
  followers?: number;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    name?: string,
    imgPerfil?: string,
    imgFloating?: string,
    lastLogin?: Date,
    reviews?: number,
    chatResponseRate?: number,
    accountCreationDate?: Date,
    quantityOfProductSold?: number,
    usuallyRespondsToChatIn?: string,
    followers?: number,

    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.imgPerfil = imgPerfil;
    this.imgFloating = imgFloating;
    this.lastLogin = lastLogin;
    this.reviews = reviews;
    this.chatResponseRate = chatResponseRate;
    this.accountCreationDate = accountCreationDate;
    this.quantityOfProductSold = quantityOfProductSold;
    this.usuallyRespondsToChatIn = usuallyRespondsToChatIn;
    this.followers = followers;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

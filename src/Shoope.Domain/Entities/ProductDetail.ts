export class ProductDetail {
  id: string;
  promotionalStock?: number;
  totalStock?: number;
  sendingOf?: string;
  mark?: string;
  gender?: string;
  warrantlyDuration?: string;
  warrantlyType?: string;
  productWeight?: string;
  energyConsumption?: string;
  amount?: string;
  material?: string;
  productId?: string;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id?: string,
    promotionalStock?: number,
    totalStock?: number,
    sendingOf?: string,
    mark?: string,
    gender?: string,
    warrantlyDuration?: string,
    warrantlyType?: string,
    productWeight?: string,
    energyConsumption?: string,
    amount?: string,
    material?: string,
    productId?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;

    this.promotionalStock = promotionalStock;
    this.totalStock = totalStock;
    this.sendingOf = sendingOf;
    this.mark = mark;
    this.gender = gender;
    this.warrantlyDuration = warrantlyDuration;
    this.warrantlyType = warrantlyType;
    this.productWeight = productWeight;
    this.energyConsumption = energyConsumption;
    this.amount = amount;
    this.material = material;
    this.productId = productId;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

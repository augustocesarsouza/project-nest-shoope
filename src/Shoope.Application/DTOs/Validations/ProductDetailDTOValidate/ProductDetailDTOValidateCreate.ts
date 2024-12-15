import { IsNotEmpty, Min } from 'class-validator';

export class ProductDetailDTOValidateCreate {
  id: string;
  @IsNotEmpty()
  @Min(0, { message: 'promotionalStock Must be Greather Than 0' })
  promotionalStock?: number;
  @IsNotEmpty()
  @Min(0, { message: 'totalStock Must be Greather Than 0' })
  totalStock?: number;
  @IsNotEmpty()
  sendingOf?: string;
  mark?: string;
  gender?: string;
  warrantlyDuration?: string;
  warrantlyType?: string;
  productWeight?: string;
  energyConsumption?: string;
  amount?: string;
  material?: string;
  @IsNotEmpty()
  productId?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

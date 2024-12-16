import { IsNotEmpty, Min } from 'class-validator';

export class ProductHighlightDTOValidateCreate {
  id: string;
  @IsNotEmpty()
  title?: string;
  @IsNotEmpty()
  imgBase64?: string;

  @IsNotEmpty()
  imgTop?: string;
  @IsNotEmpty()
  @Min(0, { message: 'quantitySold must be at least 0' })
  quantitySold?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

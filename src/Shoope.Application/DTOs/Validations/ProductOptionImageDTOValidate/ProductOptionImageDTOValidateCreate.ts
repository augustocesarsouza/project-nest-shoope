import { IsNotEmpty } from 'class-validator';

export class ProductOptionImageDTOValidateCreate {
  id: string;
  @IsNotEmpty()
  optionType?: string;
  @IsNotEmpty()
  imgAlt?: string;
  @IsNotEmpty()
  imageBase64?: string;
  titleOptionType?: string;
  @IsNotEmpty()
  productsOfferFlashId?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

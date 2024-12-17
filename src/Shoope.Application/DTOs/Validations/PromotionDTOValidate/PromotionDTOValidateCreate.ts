import { IsNotEmpty, Matches, Min } from 'class-validator';

export class PromotionDTOValidateCreate {
  id: string;
  @IsNotEmpty()
  @Min(0, { message: 'whatIsThePromotion must be greater than or equal to 0' })
  whatIsThePromotion?: number;
  @IsNotEmpty()
  title?: string;
  @IsNotEmpty()
  description?: string;
  @IsNotEmpty()
  @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4} ([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Date must follow the format DD/MM/YYYY HH:mm',
  })
  dateCreate?: string;
  @IsNotEmpty()
  img?: string;
  imgInnerFirst?: string;
  altImgInnerFirst?: string;
  imgInnerSecond?: string;
  altImgInnerSecond?: string;
  imgInnerThird?: string;
  altImgInnerThird?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

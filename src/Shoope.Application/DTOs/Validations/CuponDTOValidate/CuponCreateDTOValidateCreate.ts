import { IsNotEmpty, Length, Matches, MaxLength } from 'class-validator';

export class CuponCreateDTOValidateCreate {
  id: string;
  @IsNotEmpty()
  firstText?: string;
  @IsNotEmpty()
  secondText?: string;
  @IsNotEmpty()
  thirdText?: string;
  @IsNotEmpty()
  @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'Date must follow the format DD/MM/YYYY',
  })
  DateValidateCuponString?: string;
  dateValidateCupon?: Date;
  @MaxLength(0)
  quantityCupons?: number;
  @Length(2, 6, { message: 'whatCuponNumber must be between 2 and 6' })
  whatCuponNumber?: number;
  secondImg?: string;
  secondImgAlt?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

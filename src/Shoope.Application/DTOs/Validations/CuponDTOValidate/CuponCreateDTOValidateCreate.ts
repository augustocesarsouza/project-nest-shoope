import { IsNotEmpty, Matches, Max, Min } from 'class-validator';

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
  @Min(0)
  quantityCupons?: number;
  @Min(2, { message: 'whatCuponNumber Min 2' })
  @Max(6, { message: 'whatCuponNumber Max 6' })
  whatCuponNumber?: number;
  secondImg?: string;
  secondImgAlt?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

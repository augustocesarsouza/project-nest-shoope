import { IsNotEmpty, Length, Matches, MaxLength, MinLength } from 'class-validator';

export class AddressDTOValidatorUpdate {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty({
    message: 'Must be informed a fullName',
  })
  fullName?: string;
  @IsNotEmpty()
  @Matches(/\(\+\d{2}\) \d{2} \d{5} \d{4}/, {
    message: 'PhoneNumber must follow the format (+99) 99 99999 9999',
  })
  @MaxLength(19, {
    message: 'phoneNumber must have at most 19 characters',
  })
  phoneNumber?: string;
  @IsNotEmpty()
  @Matches(/\d{5}-\d{3}/, {
    message: 'CEP must follow the format 99999-999',
  })
  @Length(9, 9, { message: 'CEP must have exactly 9 characters' })
  cep?: string;
  @IsNotEmpty()
  @MinLength(2, { message: 'stateCity must be at least 2 characters ' })
  stateCity?: string;
  @IsNotEmpty()
  @MinLength(2)
  neighborhood?: string;
  @IsNotEmpty()
  @MinLength(2)
  street?: string;
  @IsNotEmpty()
  @MinLength(1)
  numberHome?: string;
  complement?: string;
  defaultAddress?: number;
  userId?: string;

  constructor(init?: Partial<AddressDTOValidatorUpdate>) {
    Object.assign(this, init);
  }
}

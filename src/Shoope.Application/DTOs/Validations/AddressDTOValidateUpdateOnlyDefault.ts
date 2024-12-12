import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class AddressDTOValidateUpdateOnlyDefault {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty({ message: "defaultAddress can't be null" })
  @IsIn([0, 1], { message: 'defaultAddress must be 0 or 1' })
  defaultAddress?: number;
  @IsOptional()
  userId?: string;

  constructor(init?: Partial<AddressDTOValidateUpdateOnlyDefault>) {
    Object.assign(this, init);
  }
}

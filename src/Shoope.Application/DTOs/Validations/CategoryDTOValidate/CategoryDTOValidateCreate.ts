import { IsNotEmpty } from 'class-validator';

export class CategoryDTOValidateCreate {
  id: string;
  @IsNotEmpty()
  imgCategory?: string;
  @IsNotEmpty()
  altValue?: string;
  @IsNotEmpty()
  title?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

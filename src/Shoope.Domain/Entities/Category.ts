export class Category {
  id: string;
  imgCategory?: string;
  altValue?: string;
  title?: string;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id?: string,
    imgCategory?: string,
    altValue?: string,
    title?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.imgCategory = imgCategory;
    this.altValue = altValue;
    this.title = title;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

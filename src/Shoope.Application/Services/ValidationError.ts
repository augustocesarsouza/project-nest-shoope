export class ValidationError {
  field: string;
  message: string;

  constructor(field: string, message: string) {
    this.field = field;
    this.message = message;
  }

  // constructor(init?: Partial<ValidationError>) {
  //   Object.assign(this, init);
  // }
}

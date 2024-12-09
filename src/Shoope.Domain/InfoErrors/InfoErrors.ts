export class InfoErrors<T> {
  isSuccess: boolean;
  message?: string;
  data?: T;

  constructor(isSuccess: boolean, message?: string, data?: T) {
    this.isSuccess = isSuccess;
    this.message = message;
    this.data = data;
  }

  static fail<T>(message: string): InfoErrors<T> {
    return new InfoErrors(false, message);
  }

  static failData<T>(message?: string): InfoErrors<T> {
    return new InfoErrors<T>(false, message, null);
  }

  static ok<T>(message?: string): InfoErrors<T> {
    return new InfoErrors(true, message);
  }

  static okData<T>(data?: T): InfoErrors<T> {
    return new InfoErrors<T>(true, '', data);
  }
}

import { ValidationError } from './ValidationError';

export class ResultService<T> {
  isSuccess: boolean;
  message?: string;
  errors?: ValidationError[];
  data?: T;

  constructor(isSuccess: boolean, message?: string, errors?: ValidationError[], data?: T) {
    this.isSuccess = isSuccess;
    this.message = message;
    this.errors = errors;
    this.data = data;
  }

  /**
   * Cria um ResultService com erro de validação.
   * @param message Mensagem de erro principal.
   * @param validationResult Objeto contendo erros de validação.
   */
  static requestError<T>(
    message: string,
    validationResult: { errors: ValidationError[] },
  ): ResultService<T> {
    return new ResultService<T>(
      false,
      message,
      validationResult.errors.map((err) => ({
        field: err.field,
        message: err.message,
      })),
    );
  }

  /**
   * Cria um ResultService com erro e uma mensagem.
   * @param message Mensagem de erro.
   */
  static fail<T>(message: string): ResultService<T> {
    return new ResultService<T>(false, message);
  }

  /**
   * Cria um ResultService com erro e dados associados.
   * @param data Dados associados ao erro.
   */
  static failWithData<T>(data: T): ResultService<T> {
    return new ResultService<T>(false, undefined, undefined, data);
  }

  /**
   * Cria um ResultService indicando sucesso com dados associados.
   * @param data Dados associados ao sucesso.
   */
  static ok<T>(data: T): ResultService<T> {
    return new ResultService<T>(true, undefined, undefined, data);
  }

  /**
   * Cria um ResultService indicando sucesso com uma mensagem.
   * @param message Mensagem associada ao sucesso.
   */
  static okWithMessage<T>(message: string): ResultService<T> {
    return new ResultService<T>(true, message);
  }
}

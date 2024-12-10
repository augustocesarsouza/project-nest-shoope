import { IsNotEmpty } from 'class-validator';

export class CodeSendEmailUserDTO {
  @IsNotEmpty()
  name?: string;
  @IsNotEmpty()
  email?: string;
  code?: string;
  codeSendToEmailSuccessfully: boolean;
  userAlreadyExist: boolean;

  constructor(init?: Partial<CodeSendEmailUserDTO>) {
    Object.assign(this, init);
  }
}

export class UserPasswordUpdateDTO {
  passwordUpdateSuccessfully: boolean = false;

  constructor(passwordUpdateSuccessfully: boolean) {
    this.passwordUpdateSuccessfully = passwordUpdateSuccessfully;
  }
}

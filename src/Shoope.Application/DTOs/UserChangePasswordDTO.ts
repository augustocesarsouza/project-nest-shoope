export class UserChangePasswordDTO {
  phone: string;
  confirmPassword: string;

  constructor(phone: string, confirmPassword: string) {
    this.phone = phone;
    this.confirmPassword = confirmPassword;
  }
}

export class User {
  id: string;
  name?: string;
  email?: string;
  gender?: string;
  phone?: string;
  passwordHash?: string;
  salt?: string;
  cpf?: string;
  birthDate?: Date;
  userImage?: string;
  // token: string; -> colocar no DTO

  constructor() {}
}

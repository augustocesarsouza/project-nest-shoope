import { ResultService } from '../ResultService';
import { UserLoginDTO } from 'src/Shoope.Application/DTOs/UserLoginDTO';

export abstract class IUserAuthenticationService {
  abstract Login(phone: string, password: string): Promise<ResultService<UserLoginDTO>>;
}

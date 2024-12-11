import { Injectable } from '@nestjs/common';
import { IAddressService } from './Interfaces/IAddressService';

@Injectable()
export class AddressService implements IAddressService {
  constructor() {}
}

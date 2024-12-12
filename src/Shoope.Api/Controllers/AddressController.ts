import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { IAddressService } from 'src/Shoope.Application/Services/Interfaces/IAddressService';
import { Response } from 'express';
import { AddressDTOValidateCreate } from 'src/Shoope.Application/DTOs/Validations/AddressDTOValidateCreate';
import { AddressDTOValidatorUpdate } from 'src/Shoope.Application/DTOs/Validations/AddressDTOValidatorUpdate';
import { AddressDTOValidateUpdateOnlyDefault } from 'src/Shoope.Application/DTOs/Validations/AddressDTOValidateUpdateOnlyDefault';

@Controller('v1/public/address')
export class AddressController {
  constructor(private readonly _addressService: IAddressService) {}

  // @UseGuards(UserAuthGuard)
  @Get('get-address-by-id/:addressId')
  async GetAddressById(@Param('addressId') addressId: string, @Res() res: Response) {
    const result = await this._addressService.GetAddressById(addressId);

    if (result.isSuccess) {
      // return { statusCode: HttpStatus.OK, result };
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result.data,
    });
  }

  @Get('get-address-by-user-id/:userId')
  async GetAddressByUserId(@Param('userId') userId: string, @Res() res: Response) {
    const result = await this._addressService.GetAddressByUserId(userId);

    if (result.isSuccess) {
      // return { statusCode: HttpStatus.OK, result };
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result.data,
    });
  }

  @Get('get-address-by-user-id-user/:userId')
  async GetAddressByUserIdUser(@Param('userId') userId: string, @Res() res: Response) {
    const result = await this._addressService.GetAddressByUserIdUser(userId);

    if (result.isSuccess) {
      // return { statusCode: HttpStatus.OK, result };
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result.data,
    });
  }

  @Post('create')
  async CreateAsync(
    @Body() addressDTOValidateCreate: AddressDTOValidateCreate,
    @Res() res: Response,
  ) {
    const result = await this._addressService.Create(addressDTOValidateCreate);

    if (result.isSuccess) {
      // return { statusCode: HttpStatus.OK, data: result };
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    // return { statusCode: HttpStatus.BAD_REQUEST, data: result };
    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result,
    });
  }

  @Put('update')
  async UpdateAsync(
    @Body() addressDTOValidatorUpdate: AddressDTOValidatorUpdate,
    @Res() res: Response,
  ) {
    const result = await this._addressService.UpdateAddressUser(addressDTOValidatorUpdate);

    if (result.isSuccess) {
      // return { statusCode: HttpStatus.OK, result };
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    // return { statusCode: HttpStatus.BAD_REQUEST, data: result };
    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result,
    });
  }

  @Put('update-only-default-address')
  async UpdateAsyncOnlyDefaultAddress(
    @Body() addressDTOValidateUpdateOnlyDefault: AddressDTOValidateUpdateOnlyDefault,
    @Res() res: Response,
  ) {
    const result = await this._addressService.UpdateAsyncOnlyDefaultAddress(
      addressDTOValidateUpdateOnlyDefault,
    );

    if (result.isSuccess) {
      // return { statusCode: HttpStatus.OK, result };
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    // return { statusCode: HttpStatus.BAD_REQUEST, data: result };
    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result,
    });
  }

  @Delete('delete/:addressId')
  async DeleteAsync(@Param('addressId') addressId: string, @Res() res: Response) {
    const result = await this._addressService.Delete(addressId);

    if (result.isSuccess) {
      // return { statusCode: HttpStatus.OK, result };
      return res.status(HttpStatus.OK).json({
        data: result.data,
      });
    }

    // return { statusCode: HttpStatus.BAD_REQUEST, result };
    return res.status(HttpStatus.BAD_REQUEST).json({
      data: result,
    });
  }
}

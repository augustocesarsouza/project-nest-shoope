import { CloudinaryCreate } from 'src/Shoope.Infra.Data/CloudinaryConfigClass/CloudinaryCreate';
import { CloudinaryResult } from 'src/Shoope.Infra.Data/ReturnDTO/CloudinaryResult';

export abstract class IClodinaryUti {
  abstract CreateMedia(
    url: string,
    folder: string,
    width: number,
    height: number,
  ): Promise<CloudinaryCreate>;
  abstract DeleteMediaCloudinary(file: any): CloudinaryResult;
}

import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { Inject } from '@nestjs/common'; // Importa o decorador Inject
import { ConfigService } from '@nestjs/config'; // Importa o ConfigService
import { IClodinaryUti } from './Interface/IClodinaryUti';
import { CloudinaryCreate } from '../CloudinaryConfigClass/CloudinaryCreate';
import { CloudinaryResult } from '../ReturnDTO/CloudinaryResult';

@Injectable()
export class ClodinaryUti implements IClodinaryUti {
  private cloudinaryInstance: typeof cloudinary.v2;

  constructor(
    @Inject(ConfigService) private readonly config: ConfigService, // Use ConfigService aqui
  ) {
    this.cloudinaryInstance = cloudinary.v2;

    // Configura o Cloudinary com as variáveis de ambiente
    this.cloudinaryInstance.config({
      cloud_name: this.config.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.config.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.config.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async CreateMedia(
    url: string,
    folder: string,
    width: number,
    height: number,
  ): Promise<CloudinaryCreate> {
    const isImage = url.startsWith('data:image');
    const isVideo = url.startsWith('data:video');

    if (isImage) {
      const result = await this.cloudinaryInstance.uploader.upload(url, {
        folder,
        width,
        height,
        crop: 'fill',
        quality: 'auto',
        format: 'jpg',
      });

      const cloudinaryCreate = new CloudinaryCreate();
      cloudinaryCreate.imgUrl = result.secure_url;
      cloudinaryCreate.publicId = result.public_id;
      cloudinaryCreate.createdSuccessfully = true;

      return cloudinaryCreate;
    } else if (isVideo) {
      const result = await this.cloudinaryInstance.uploader.upload(url, {
        folder,
        resource_type: 'video',
        width,
        height,
        crop: 'fill',
        quality: 'auto',
      });

      const cloudinaryCreate = new CloudinaryCreate();
      cloudinaryCreate.imgUrl = result.secure_url;
      cloudinaryCreate.publicId = result.public_id;
      cloudinaryCreate.createdSuccessfully = true;

      return cloudinaryCreate;
    } else {
      const cloudinaryCreate = new CloudinaryCreate();
      cloudinaryCreate.imgUrl = null;
      cloudinaryCreate.publicId = null;
      cloudinaryCreate.createdSuccessfully = false;
      return cloudinaryCreate;
    }
  }

  async DeleteMediaCloudinary(publicId: string, resourceType: string): Promise<CloudinaryResult> {
    const cloudinaryResult = new CloudinaryResult();
    try {
      const result = await this.cloudinaryInstance.uploader.destroy(publicId, {
        resource_type: resourceType,
      });

      if (result.result === 'ok') {
        cloudinaryResult.deleteSuccessfully = true;
      } else {
        cloudinaryResult.deleteSuccessfully = false;
      }

      return cloudinaryResult;
    } catch (error) {
      cloudinaryResult.deleteSuccessfully = false;
      cloudinaryResult.message = error;
      return cloudinaryResult;
    }
  }

  public DeleteFileCloudinaryExtractingPublicIdFromUrl = async (
    url: string,
    resourceType: string,
  ): Promise<CloudinaryResult> => {
    const cloudinaryResult = new CloudinaryResult();
    const match = url.match(/upload\/(?:v\d+\/)?(.+)/);
    const extractedPath = match ? match[1] : null;
    const index = extractedPath.lastIndexOf('.');

    if (!extractedPath) {
      cloudinaryResult.deleteSuccessfully = false;
      return cloudinaryResult;
    }

    const pathWithoutExtension = index !== -1 ? extractedPath.slice(0, index) : extractedPath;

    const deleteCloudinary = await this.DeleteMediaCloudinary(pathWithoutExtension, resourceType);

    if (!deleteCloudinary.deleteSuccessfully) {
      return deleteCloudinary;
    }

    return deleteCloudinary;
  };
}

import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v5 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileUploadService {
  private readonly init;

  constructor(
    @Inject('CONFIG_OPTIONS') private options,
    private readonly configService: ConfigService,
  ) {
    this.init = (folder) => {
      return new AWS.S3({
        endpoint: `${this.configService.get<string>('aws.endpoint')}/${
          folder || options.folder
        }`,
        accessKeyId: this.configService.get<string>('aws.access_key'),
        secretAccessKey: this.configService.get<string>('aws.secret_key'),
      });
    };
  }

  async delete(key, folder = null) {
    const s3 = this.init(folder);

    await s3
      .deleteObject({
        Bucket: this.configService.get<string>('aws.bucket_name'),
        Key: key,
      })
      .promise();
  }

  async upload({ buffer, contentType, folder = null }) {
    const randomString = Date.now().toString();
    const uuidNameSpace = 'f8e0c645-61ff-4287-a5eb-bf21dcfbc295';
    const key = `${uuid(randomString, uuidNameSpace)}-${Date.now().toString(
      16,
    )}`;

    const s3 = this.init(folder);
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get<string>('aws.bucket_name'),
        Body: buffer,
        Key: key,
        ContentType: contentType,
        ACL: 'public-read',
      })
      .promise();

    return {
      url: uploadResult.Location,
      key: uploadResult.Key,
    };
  }

  async update({ buffer, contentType, key, folder = null }) {
    const s3 = this.init(folder);
    const updateImage = await s3
      .putObject({
        Bucket: this.configService.get<string>('aws.bucket_name'),
        Body: Buffer.from(buffer),
        Key: key,
        ContentType: contentType,
        ACL: 'public-read',
      })
      .promise();

    return {
      result: updateImage.ETag,
    };
  }
}

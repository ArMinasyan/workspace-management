import { DynamicModule, Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';

@Module({})
export class FileUploadModule {
  static register(options): DynamicModule {
    return {
      module: FileUploadModule,
      providers: [
        FileUploadService,
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
      ],
      exports: [FileUploadService],
    };
  }
}

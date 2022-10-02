import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import validationMessages from '../../../common/helpers/validation.messages';

export class CreateWorkspaceDto {
  @ApiProperty()
  @IsString({ message: validationMessages.required })
  name: string;

  @ApiProperty()
  @IsString({ message: validationMessages.required })
  subDomain: string;
}

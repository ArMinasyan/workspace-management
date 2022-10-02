import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import ValidationMessages from '../../../common/helpers/validation.messages';

export class CreateChannelDto {
  @ApiProperty()
  @IsString({ message: ValidationMessages.required })
  name: string;
}

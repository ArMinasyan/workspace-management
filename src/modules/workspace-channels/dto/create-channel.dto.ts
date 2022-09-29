import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateChannelDto {
  @ApiProperty()
  @IsString()
  name: string;
}

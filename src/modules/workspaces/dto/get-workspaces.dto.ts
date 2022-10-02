import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class GetWorkspacesDto {
  @ApiProperty()
  @IsNumberString()
  offset: number;

  @ApiProperty()
  @IsNumberString()
  limit: number;
}

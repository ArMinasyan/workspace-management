import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateWorkspaceDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
}

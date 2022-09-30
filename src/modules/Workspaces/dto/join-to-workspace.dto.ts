import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class JoinToWorkspaceDto {
  @ApiProperty()
  @IsNumber()
  workspaceId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class JoinToWorkspaceDto {
  @ApiProperty()
  @IsNumberString()
  workspaceId: number;
}

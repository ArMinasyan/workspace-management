import { JoinToWorkspaceDto } from './join-to-workspace.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class InviteToWorkspaceDto extends JoinToWorkspaceDto {
  @ApiProperty()
  @IsNumber()
  userId: number;
}

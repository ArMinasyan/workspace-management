import { JoinToWorkspaceDto } from './join-to-workspace.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class InviteToWorkspaceDto extends JoinToWorkspaceDto {
  @ApiProperty()
  @IsNumberString()
  userId: number;
}

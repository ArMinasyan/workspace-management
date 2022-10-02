import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { User } from '../../common/customDecorators/user.decorator';
import { JoinToWorkspaceDto } from './dto/join-to-workspace.dto';
import { InviteToWorkspaceDto } from './dto/invite-to-workspace.dto';
import { GetWorkspacesDto } from './dto/get-workspaces.dto';
import { GetParticipantsDto } from './dto/get-participants.dto';

@ApiBearerAuth()
@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @ApiOperation({
    tags: ['Workspaces'],
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @Post()
  create(@Body() payload: CreateWorkspaceDto, @User() user) {
    return this.workspacesService.create(user.id, payload);
  }

  @ApiOperation({
    tags: ['Workspaces'],
  })
  @Get()
  findAll(@Query() query: GetWorkspacesDto) {
    return this.workspacesService.findAll(query);
  }

  @ApiOperation({
    tags: ['Workspaces'],
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workspacesService.findOne(+id);
  }

  @ApiOperation({
    tags: ['Workspaces'],
  })
  @Get(':id/participants')
  findAllParticipants(
    @Query() query: GetParticipantsDto,
    @Param('id') id: number,
  ) {
    return this.workspacesService.getAllParticipants(id, query);
  }

  @ApiOperation({
    tags: ['Workspaces'],
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @Post('join')
  joinToWorkspace(@Body() payload: JoinToWorkspaceDto, @User() user: any) {
    return this.workspacesService.joinToWorkspace({
      ...payload,
      userId: user.id,
    });
  }

  @ApiOperation({
    tags: ['Workspaces'],
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @Post('invite')
  inviteToWorkspace(@Body() payload: InviteToWorkspaceDto, @User() user: any) {
    return this.workspacesService.inviteToWorkspace({
      ...payload,
      inviterId: user.id,
    });
  }

  @ApiOperation({
    tags: ['Workspaces'],
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateWorkspaceDto) {
    return this.workspacesService.update(+id, payload);
  }

  @ApiOperation({
    tags: ['Workspaces'],
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspacesService.remove(+id);
  }
}

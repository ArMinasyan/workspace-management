import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
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
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() payload: CreateWorkspaceDto, @User() user) {
    return this.workspacesService.create(user.id, payload);
  }

  @ApiOperation({
    tags: ['Workspaces'],
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query() query: GetWorkspacesDto) {
    const response = await this.workspacesService.findAll(query);

    if (!response.statusCode.toString().startsWith('2')) {
      throw new HttpException(response, response.statusCode);
    }

    return response;
  }

  @ApiOperation({
    tags: ['Workspaces'],
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.workspacesService.findOne(+id);

    if (!response.statusCode.toString().startsWith('2')) {
      throw new HttpException(response, response.statusCode);
    }

    return response;
  }

  @ApiOperation({
    tags: ['Workspaces'],
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id/participants')
  async findAllParticipants(
    @Query() query: GetParticipantsDto,
    @Param('id') id: number,
  ) {
    const response = await this.workspacesService.getAllParticipants(id, query);
    if (!response.statusCode.toString().startsWith('2')) {
      throw new HttpException(response, response.statusCode);
    }
    return response;
  }

  @ApiOperation({
    tags: ['Workspaces'],
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @HttpCode(HttpStatus.CREATED)
  @Post('join')
  async joinToWorkspace(
    @Body() payload: JoinToWorkspaceDto,
    @User() user: any,
  ) {
    const response = await this.workspacesService.joinToWorkspace({
      ...payload,
      userId: user.id,
    });
    if (!response.statusCode.toString().startsWith('2')) {
      throw new HttpException(response, response.statusCode);
    }
    return response;
  }

  @ApiOperation({
    tags: ['Workspaces'],
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @HttpCode(HttpStatus.CREATED)
  @Post('invite')
  async inviteToWorkspace(
    @Body() payload: InviteToWorkspaceDto,
    @User() user: any,
  ) {
    const response = await this.workspacesService.inviteToWorkspace({
      ...payload,
      inviterId: user.id,
    });
    if (!response.statusCode.toString().startsWith('2')) {
      throw new HttpException(response, response.statusCode);
    }

    return response;
  }

  @ApiOperation({
    tags: ['Workspaces'],
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateWorkspaceDto) {
    const response = await this.workspacesService.update(+id, payload);
    if (!response.statusCode.toString().startsWith('2')) {
      throw new HttpException(response, response.statusCode);
    }

    return response;
  }

  @ApiOperation({
    tags: ['Workspaces'],
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.workspacesService.remove(+id);
    if (!response.statusCode.toString().startsWith('2')) {
      throw new HttpException(response, response.statusCode);
    }

    return response;
  }
}

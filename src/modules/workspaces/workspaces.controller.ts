import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { User } from '../../common/customDecorators/user.decorator';

@ApiBearerAuth()
@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @ApiOperation({
    tags: ['Workspaces'],
  })
  @Post()
  create(@Body() payload: CreateWorkspaceDto, @User() user) {
    return this.workspacesService.create(user.id, payload);
  }

  @ApiOperation({
    tags: ['Workspaces'],
  })
  @Get()
  findAll() {
    return this.workspacesService.findAll();
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

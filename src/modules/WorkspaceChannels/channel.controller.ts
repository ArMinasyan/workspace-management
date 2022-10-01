import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { User } from '../../common/customDecorators/user.decorator';

@ApiBearerAuth()
@Controller('workspaces/:workspaceId')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @ApiOperation({
    tags: ['Channels'],
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @Post('channels')
  create(
    @Param('workspaceId') workspaceId: number,
    @User() user,
    @Body() payload: CreateChannelDto,
  ) {
    return this.channelService.create(workspaceId, user.id, payload);
  }

  @ApiOperation({
    tags: ['Channels'],
  })
  @Get('channels')
  findAll(@Param('workspaceId', ParseIntPipe) workspaceId: number) {
    return this.channelService.findAll(workspaceId);
  }

  @ApiOperation({
    tags: ['Channels'],
  })
  @Get('channels/:id')
  findOne(@Param('id') id: string) {
    return this.channelService.findOne(+id);
  }

  @ApiOperation({
    tags: ['Channels'],
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateWorkspaceDto) {
    return this.channelService.update(+id, payload);
  }

  @ApiOperation({
    tags: ['Channels'],
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.channelService.remove(+id);
  }
}

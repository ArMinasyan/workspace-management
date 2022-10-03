import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { User } from '../../common/customDecorators/user.decorator';
import { GetChannelsDto } from './dto/get-channels.dto';

@ApiBearerAuth()
@Controller('workspaces/:workspaceId')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @ApiOperation({
    tags: ['Channels'],
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @HttpCode(HttpStatus.CREATED)
  @Post('channels')
  async create(
    @Param('workspaceId') workspaceId: number,
    @User() user,
    @Body() payload: CreateChannelDto,
  ) {
    const response = await this.channelService.create(
      workspaceId,
      user.id,
      payload,
    );

    if (!response.statusCode.toString().startsWith('2')) {
      throw new HttpException(response, response.statusCode);
    }

    return response;
  }

  @ApiOperation({
    tags: ['Channels'],
  })
  @HttpCode(HttpStatus.OK)
  @Get('channels')
  async findAll(
    @Query() query: GetChannelsDto,
    @Param('workspaceId', ParseIntPipe) workspaceId: number,
  ) {
    const response = await this.channelService.findAll(workspaceId, query);
    if (!response.statusCode.toString().startsWith('2')) {
      throw new HttpException(response, response.statusCode);
    }

    return response;
  }

  @ApiOperation({
    tags: ['Channels'],
  })
  @HttpCode(HttpStatus.OK)
  @Get('channels/:id')
  async findOne(@Param('id') id: string) {
    const response = await this.channelService.findOne(+id);
    if (!response.statusCode.toString().startsWith('2')) {
      throw new HttpException(response, response.statusCode);
    }

    return response;
  }

  @ApiOperation({
    tags: ['Channels'],
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateWorkspaceDto) {
    const response = await this.channelService.update(+id, payload);
    if (!response.statusCode.toString().startsWith('2')) {
      throw new HttpException(response, response.statusCode);
    }

    return response;
  }

  @ApiOperation({
    tags: ['Channels'],
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.channelService.remove(+id);
    if (!response.statusCode.toString().startsWith('2')) {
      throw new HttpException(response, response.statusCode);
    }

    return response;
  }
}

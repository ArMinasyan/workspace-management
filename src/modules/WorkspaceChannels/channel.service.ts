import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelRepository } from './channel.repository';
import { ChannelEntity } from './entities/channel.entity';
import responseMessage from '../../common/helpers/response-message';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(ChannelRepository)
    private readonly channelRepository: ChannelRepository,
  ) {}

  async create(workspaceId: number, userId: number, payload: CreateChannelDto) {
    return this.channelRepository.createChannel(workspaceId, userId, payload);
  }

  async findAll(workspaceId: number): Promise<ChannelEntity[]> {
    return await this.channelRepository.find({
      where: {
        workspace: workspaceId,
      },
    });
  }

  async findOne(id: number): Promise<ChannelEntity> {
    return await this.channelRepository.findById(id);
  }

  async update(id: number, payload: UpdateWorkspaceDto) {
    const channel = await this.channelRepository.findById(id);
    if (!channel?.id) {
      return responseMessage({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Channel with id=${id} not found`,
      });
    }

    await this.channelRepository.update(id, {
      name: payload.name,
    });

    return responseMessage({
      message: 'Channel is updated',
      data: {
        id,
        name: payload.name,
      },
    });
  }

  async remove(id: number) {
    const workspace = await this.channelRepository.findById(id);
    if (!workspace?.id) {
      return responseMessage({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Channel with id=${id} not found`,
      });
    }

    await this.channelRepository.softDelete(id);

    return responseMessage({
      message: `Channel with id=${id} deleted`,
    });
  }
}
